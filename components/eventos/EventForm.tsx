import React, { useState, useEffect } from "react"
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Picker } from "@react-native-picker/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { EventosService } from "@/services/events.service"
import { CategoriasService } from "@/services/categorias.service"
import { EstadosService } from "@/services/estados.service"
import { useQuery } from "@tanstack/react-query"
// import { getUsuario } from "@/context/auth"

const formSchema = z.object({
  nombreEvento: z.string().min(1, "El nombre del evento es requerido"),
  categoriaID: z.string().min(1, "La categoría del evento es requerida"),
  subCategoriaID: z.string().min(1, "La subcategoría del evento es requerida"),
  lugarEvento: z.string().min(1, "El lugar del evento es requerido"),
  maximoParticipantesEvento: z
    .string()
    .min(1, "El máximo de participantes es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Debe ser un número positivo"),
  costoEvento: z
    .string()
    .min(1, "El costo del evento es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "El costo debe ser un número válido"),
  descripcionEvento: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no debe exceder los 500 caracteres"),
  cpEvento: z
    .string()
    .length(5, "El código postal debe tener exactamente 5 dígitos")
    .regex(/^\d+$/, "El código postal solo debe contener números"),
  municioEvento: z.string().min(1, "El municipio es requerido"),
  estadoID: z.string().min(1, "El estado es requerido"),
  direccionEvento: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  telefonoEvento: z
    .string()
    .length(10, "El teléfono debe tener exactamente 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  fechaEvento: z.date(),
  horaEvento: z.date(),
  duracionEvento: z
    .string()
    .min(1, "La duración es requerida")
    .regex(/^\d+$/, "Solo se permiten números")
    .refine((val) => Number(val) > 0 && Number(val) <= 24, "La duración debe estar entre 1 y 24 horas"),
  kitEvento: z.string().optional(),
  nuevaSubcategoria: z.string().optional(),
})

type EventFormValues = z.infer<typeof formSchema>

interface EventFormProps {
  event?: EventFormValues & { eventoID?: number }
  onSubmitSuccess: () => void
}

export function EventForm({ event, onSubmitSuccess }: EventFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [showOtherSubcategory, setShowOtherSubcategory] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const usuarioID = 1 // getUsuario().usuarioID

  const { control, handleSubmit, setValue, watch } = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoriaID: event?.categoriaID || "",
      subCategoriaID: event?.subCategoriaID || "",
      nuevaSubcategoria: "",
      nombreEvento: event?.nombreEvento || "",
      lugarEvento: event?.lugarEvento || "",
      maximoParticipantesEvento: event?.maximoParticipantesEvento || "",
      costoEvento: event?.costoEvento || "",
      descripcionEvento: event?.descripcionEvento || "",
      cpEvento: event?.cpEvento || "",
      municioEvento: event?.municioEvento || "",
      estadoID: event?.estadoID || "",
      direccionEvento: event?.direccionEvento || "",
      telefonoEvento: event?.telefonoEvento || "",
      fechaEvento: event?.fechaEvento || new Date(),
      horaEvento: event?.horaEvento || new Date(),
      duracionEvento: event?.duracionEvento || "",
      kitEvento: event?.kitEvento || "",
    },
  })

  const { data: estados = [] } = useQuery({
    queryKey: ["estados"],
    queryFn: () => EstadosService.obtenerEstados(),
    staleTime: 30 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const { data: categorias = [] } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => CategoriasService.obtenerCategoriasForm(),
    staleTime: 30 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const { data: subCategorias = [] } = useQuery({
    queryKey: ["subcategorias", selectedCategoryId],
    queryFn: () => CategoriasService.obtenerSubCategorias(Number.parseInt(selectedCategoryId)),
    enabled: !!selectedCategoryId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const onSubmit = async (values: EventFormValues) => {
    setIsSubmitting(true)
    try {
      if (event && event.eventoID) {
        await EventosService.actualizarEvento(event.eventoID, {
          ...values,
          fechaEvento: values.fechaEvento.toISOString(),
          horaEvento: values.horaEvento.toISOString(),
          estadoID: Number.parseInt(values.estadoID),
          maximoParticipantesEvento: values.maximoParticipantesEvento.toString(),
          categoriaID: Number.parseInt(values.categoriaID),
          subCategoriaID: Number.parseInt(values.subCategoriaID),
        })
        Alert.alert("¡Éxito!", "El evento se ha actualizado correctamente")
      } else {
        await EventosService.crearEvento(usuarioID, {
          ...values,
          fechaEvento: values.fechaEvento.toISOString(),
          horaEvento: values.horaEvento.toISOString(),
          estadoID: Number.parseInt(values.estadoID),
          maximoParticipantesEvento: values.maximoParticipantesEvento.toString(),
          categoriaID: Number.parseInt(values.categoriaID),
          subCategoriaID: Number.parseInt(values.subCategoriaID),
          kitEvento: values.kitEvento || "",
        })
        Alert.alert("¡Éxito!", "El evento se ha creado correctamente")
      }
      onSubmitSuccess()
    } catch (error) {
      console.error("Error al enviar el evento:", error)
      Alert.alert("Error", "Hubo un error al procesar el evento. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre del Evento</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: Carrera 5K Mérida"
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="nombreEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Categoría</Text>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue)
                setSelectedCategoryId(itemValue)
                setValue("subCategoriaID", "")
                setValue("nuevaSubcategoria", "")
                setShowOtherSubcategory(false)
              }}
              style={styles.inputDropdown}
            >
              <Picker.Item label="Selecciona una categoría" value="" />
              {categorias.map((categoria) => (
                <Picker.Item
                  key={categoria.categoriaID}
                  label={categoria.nombreCategoria}
                  value={categoria.categoriaID.toString()}
                />
              ))}
            </Picker>
          </View>
        )}
        name="categoriaID"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subcategoría</Text>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue)
                setShowOtherSubcategory(itemValue === "0")
              }}
              enabled={!!selectedCategoryId}
              style={styles.inputDropdown}
            >
              <Picker.Item
                label={selectedCategoryId ? "Selecciona una subcategoría" : "Primero selecciona una categoría"}
                value=""
                style={styles.inputDropdown}
              />
              {subCategorias.map((subCategoria) => (
                <Picker.Item
                  key={subCategoria.subcategoriaID}
                  label={subCategoria.nombreSubcategoria}
                  value={subCategoria.subcategoriaID.toString()}
                />
              ))}
              <Picker.Item label="Otro (Agregar subcategoría)" value="0" />
            </Picker>
          </View>
        )}
        name="subCategoriaID"
      />

      {showOtherSubcategory && (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nueva Subcategoría</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Ingrese la nueva subcategoría"
                placeholderTextColor="#858585"
              />
            </View>
          )}
          name="nuevaSubcategoria"
        />
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Lugar del Evento</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: Parque de las Américas"
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="lugarEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Máximo de Participantes</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: 100"
              keyboardType="numeric"
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="maximoParticipantesEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Costo del Evento</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: 250.00"
              keyboardType="numeric"
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="costoEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción del Evento</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Describe los detalles importantes del evento..."
              multiline
              numberOfLines={4}
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="descripcionEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Código Postal</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
              value={value}
              placeholder="Ej: 97000"
              keyboardType="numeric"
              maxLength={5}
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="cpEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Municipio</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: Mérida"
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="municioEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Selecciona un estado" value="" />
              {estados.map((estado) => (
                <Picker.Item key={estado.estadoID} label={estado.nombreEstado} value={estado.estadoID.toString()} />
              ))}
            </Picker>
          </View>
        )}
        name="estadoID"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: Calle 20 x 25 y 27, Col. Centro"
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="direccionEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
              value={value}
              placeholder="Ej: 9991234567"
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#858585"
            />
          </View>
        )}
        name="telefonoEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha del Evento</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={{ color: "#fff" }}>{value.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false)
                  if (selectedDate) {
                    onChange(selectedDate)
                  }
                }}
              />
            )}
          </View>
        )}
        name="fechaEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora del Evento</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.dateTimeText}>{value.toTimeString()}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={value}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false)
                  if (selectedTime) {
                    onChange(selectedTime)
                  }
                }}
              />
            )}
          </View>
        )}
        name="horaEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Duración del Evento (horas)</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
              value={value}
              placeholder="Ej: 2"
              keyboardType="numeric"
            />
          </View>
        )}
        name="duracionEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kit del Evento</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: Playera, medalla, número"
            />
          </View>
        )}
        name="kitEvento"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Procesando..." : event ? "Actualizar Evento" : "Crear Evento"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0A0A0A",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0B942",
    borderRadius: 5,
    color: "#fff",
    padding: 10,
    fontSize: 16,
    backgroundColor: "#1A1A1A",
  },
  inputDropdown: {
    borderWidth: 1,
    borderColor: "#E0B942",
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#1A1A1A",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateTimeText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#E0B942",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#E0B942",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

