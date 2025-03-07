import React, { useState, useEffect } from "react"
import { View,Button, Text,Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard  } from "react-native"
import { Picker } from "@react-native-picker/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { EventosService } from "@/services/events.service"
import { CategoriasService } from "@/services/categorias.service"
import { EstadosService } from "@/services/estados.service"
import { useQuery } from "@tanstack/react-query"
import { Platform } from "react-native"
import Modal from 'react-native-modal';
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react-native"


// import { getUsuario } from "@/context/auth"

const formSchema = z.object({
  nombreEvento: z
    .string()
    .min(1, "El nombre del evento es requerido")
    .max(255, "El nombre no debe exceder 255 caracteres"),
  categoriaID: z.string().min(1, "La categoría del evento es requerida"),
  subCategoriaID: z.string().min(1, "La subcategoría del evento es requerida"),
  lugarEvento: z
    .string()
    .min(1, "El lugar del evento es requerido")
    .max(255, "El lugar no debe exceder 255 caracteres"),
  maximoParticipantesEvento: z
    .string()
    .min(1, "El máximo de participantes es requerido")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10000,
      "Debe ser un número entre 1 y 10000",
    ),
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
  municioEvento: z.string().min(1, "El municipio es requerido").max(100, "El municipio no debe exceder 100 caracteres"),
  estadoID: z.string().min(1, "El estado es requerido"),
  direccionEvento: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(255, "La dirección no debe exceder 255 caracteres"),
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
    .refine((val) => Number(val) > 0 && Number(val) <= 48, "La duración debe estar entre 1 y 48 horas"),
  kitEvento: z.string().min(1, "El kit del evento es requerido").max(255, "El kit no debe exceder 255 caracteres"),
  nuevaSubcategoria: z.string().optional(),


  nombreTipoEntrada2: z.string().optional(),
  costoTipoEntrada2:
    z.string()
    .optional()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "El costo debe ser un número válido"),

  nombreTipoEntrada3: z.string().optional(),
  costoTipoEntrada3:
    z.string()
    .optional()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "El costo debe ser un número válido"),

  countCostoEvento: z.number().min(1, "El número de entradas debe ser al menos 1"),
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [countCostoEvento, setCountCostoEvento] = useState(1);

const {usuarioID, token,rol, fechaNacimientoUsuario}=useAuth()


  const { control, handleSubmit, setValue, watch, formState } = useForm<EventFormValues>({
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
      countCostoEvento: event?.countCostoEvento || 1,
      nombreTipoEntrada2: event?.nombreTipoEntrada2 || "",
      costoTipoEntrada2: event?.costoTipoEntrada2 || "",
      nombreTipoEntrada3: event?.nombreTipoEntrada3 || "",
      costoTipoEntrada3: event?.costoTipoEntrada3 || "",
    },
  })

  const [imageUri, setImageUri] = useState(null);
  const [formData, setFormData] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      // Convertir imagen a FormData inmediatamente
      let newFormData = new FormData();
      newFormData.append('image', {
        uri: uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      setFormData(newFormData);
      console.log('FormData creado automáticamente:', newFormData);
    } else {
      console.log('Selección de imagen cancelada');
    }
  };
  console.log(formData);
  console.log(imageUri);

  


  var tipoRol = ''
 if(rol === 'Organizador'){
        tipoRol = 'O'
      }
      else{
        tipoRol = 'P';
      }

  const { data: estados = [] } = useQuery({
    queryKey: ["estados"],
    queryFn: () => EstadosService.obtenerEstados(),
    staleTime: 30 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })


    const { data: categoriasResponse = [] } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => CategoriasService.obtenerCategoriasForm(),
    staleTime: 30 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })



  const categorias = categoriasResponse?.data ?? []


 

  const { data: subCategoriasResponse = [] } = useQuery({
    queryKey: ["subcategorias", selectedCategoryId],
    queryFn: () => CategoriasService.obtenerSubCategorias(Number.parseInt(selectedCategoryId)),
    enabled: !!selectedCategoryId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })


  const subCategorias = subCategoriasResponse?.data ?? []

  useEffect(() => {
    if (event?.categoriaID) {
      setSelectedCategoryId(event.categoriaID)
      setValue("subCategoriaID", event.subCategoriaID)
    }
  }, [event?.categoriaID, setValue])

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
          estadoID: Number(values.estadoID),
          maximoParticipantesEvento: Number(values.maximoParticipantesEvento), // Convertido a número
          categoriaID: Number(values.categoriaID),
          subCategoriaID: Number(values.subCategoriaID),
          kitEvento: values.kitEvento || "",
          categoriaNombre: "",
          subCategoriaNombre: "",
          tipo_creador: tipoRol, // Asegurar consistencia
          imagen_evento: formData, // Asegurar consistencia
          countCostoEvento: Number(countCostoEvento),
          nombreTipoEntrada2: values.nombreTipoEntrada2 || "",
          costoTipoEntrada2: values.costoTipoEntrada2 || 0,
          nombreTipoEntrada3: values.nombreTipoEntrada3 || "",
          costoTipoEntrada3: values.costoTipoEntrada3 ||  0,
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

  const pickerStyles = StyleSheet.create({
    inputIOS: {
      maxHeight: 50,
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#E0B942',
      borderRadius: 8,
      color: '#fff',
      backgroundColor: '#1A1A1A',
      marginTop: 5,
    },
    inputAndroid: {
      maxHeight: 50,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#E0B942',
      borderRadius: 8,
      color: '#fff',
      backgroundColor: '#1A1A1A',
      marginTop: 5,
    },
    pickerItem: {
      color: Platform.select({
        ios: '#000', 
        android: '#fff'
      }),
      backgroundColor: '#1A1A1A',
    },

  });

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
            {formState.errors.nombreEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.nombreEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="nombreEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Categoría</Text>
            
            {Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => { 
                if (!isModalVisible2) { 
                  setModalVisible(true); 
                } 
              }}>
                <Text style={styles.selectText}>
                  {value ? categorias.find(cat => cat.categoriaID === Number(value))?.nombreCategoria : "Selecciona una categoría"}
                </Text>
              </TouchableOpacity>      
            ) : (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onChange(itemValue);
                  setSelectedCategoryId(itemValue);
                  setValue("subCategoriaID", "");
                  setValue("nuevaSubcategoria", "");
                  setShowOtherSubcategory(false);
                }}
                style={pickerStyles.inputAndroid}
              >
                <Picker.Item label="Selecciona una categoría" value="" style={styles.pickerItem} />
                {categorias.map((categoria) => (
                  <Picker.Item
                    key={categoria.categoriaID}
                    label={categoria.nombreCategoria}
                    value={categoria.categoriaID.toString()}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            )}

            <Modal isVisible={isModalVisible}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                          <Text style={styles.modalCancelButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.modalDoneButton}>Listo</Text>
                        </TouchableOpacity>
                      </View>
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setSelectedCategoryId(itemValue);
                          setValue("subCategoriaID", "");
                          setValue("nuevaSubcategoria", "");
                          setShowOtherSubcategory(false);
                        }}
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
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {formState.errors.categoriaID && (
              <Text style={styles.errorText}>
                {formState.errors.categoriaID?.message}
              </Text>
            )}
          </View>
        )}
        name="categoriaID"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subcategoría</Text>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity  onPress={() => { 
                if (!isModalVisible) { 
                  setModalVisible2(true); 
                }}}
                disabled={!selectedCategoryId} 
              >
                <Text style={[styles.selectText, !selectedCategoryId ? { color: "#858585" } : { color: "#fff" }]}>
                  {value ? subCategorias.find(cat => cat.subcategoriaID === Number(value))?.nombreSubcategoria : selectedCategoryId ? "Selecciona una subcategoría" : "Primero selecciona una categoría"}
                </Text>

              </TouchableOpacity>  
            ) : (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onChange(itemValue)
                  setShowOtherSubcategory(itemValue === "0")
                }}
                enabled={!!selectedCategoryId}
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#fff", 
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#E0B942",
                  borderRadius: 8,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Picker.Item
                  label={selectedCategoryId ? "Selecciona una subcategoría" : "Primero selecciona una categoría"}
                  value=""
                  style={{ color: "#000000" }}
                />
                {subCategorias.map((subCategoria) => (
                  <Picker.Item
                    key={subCategoria.subcategoriaID}
                    label={subCategoria.nombreSubcategoria}
                    value={subCategoria.subcategoriaID.toString()}
                    style={styles.pickerItem}
                  />
                ))}
                <Picker.Item label="Otro (Agregar subcategoría)" value="0" style={{ color: "#000000" }} />
              </Picker>
            )}

            <Modal isVisible={isModalVisible2}>
              <TouchableWithoutFeedback onPress={() => setModalVisible2(false)}>
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setModalVisible2(false)}>
                          <Text style={styles.modalCancelButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible2(false);
                          }}
                        >
                          <Text style={styles.modalDoneButton}>Listo</Text>
                        </TouchableOpacity>
                      </View>
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue)
                          setShowOtherSubcategory(itemValue === "0")
                        }}
                        enabled={!!selectedCategoryId}
                      >
                        <Picker.Item
                          label={selectedCategoryId ? "Selecciona una subcategoría" : "Primero selecciona una categoría"}
                          value=""
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
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            {formState.errors.subCategoriaID && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.subCategoriaID?.message}
              </Text>
            )}
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
              {formState.errors.nuevaSubcategoria && (
                <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                  {formState.errors.nuevaSubcategoria?.message}
                </Text>
              )}
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
            {formState.errors.lugarEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.lugarEvento?.message}
              </Text>
            )}
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
            {formState.errors.maximoParticipantesEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.maximoParticipantesEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="maximoParticipantesEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{(selectedCategoryId === "6" || selectedCategoryId === "11") ? "Costo de la entrada general" : "Costo del Evento"}</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ej: 0.00"
              keyboardType="numeric"
              placeholderTextColor="#858585"
            />
            {formState.errors.costoEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.costoEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="costoEvento"
      />

      
      {countCostoEvento > 1 && (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del tipo de entrada 2</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ej: Entrada VIP"
                  placeholderTextColor="#858585"
                />
                {formState.errors.nombreTipoEntrada2 && (
                  <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                    {formState.errors.nombreTipoEntrada2?.message}
                  </Text>
                )}
              </View>
            )}
            name="nombreTipoEntrada2"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Costo del tipo de entrada 2</Text>
                <TextInput
                  style={styles.input}  
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ej: 250.00"
                  keyboardType="numeric"
                  placeholderTextColor="#858585"
                />
                {formState.errors.costoTipoEntrada2 && (
                  <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                    {formState.errors.costoTipoEntrada2?.message}
                  </Text>
                )}
              </View>
            )}
            name="costoTipoEntrada2"
          />
        </>
      )}

      {countCostoEvento > 2 && (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del tipo de entrada 3</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ej: Entrada Premium"
                  placeholderTextColor="#858585"
                />
                {formState.errors.nombreTipoEntrada3 && (
                  <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                    {formState.errors.nombreTipoEntrada3?.message}
                  </Text>
                )}
              </View>
            )}
            name="nombreTipoEntrada3"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Costo del tipo de entrada 3</Text>
                <TextInput
                  style={styles.input}  
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ej: 500.00"
                  keyboardType="numeric"
                  placeholderTextColor="#858585"
                />
                {formState.errors.costoTipoEntrada3 && (
                  <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                    {formState.errors.costoTipoEntrada3?.message}
                  </Text>
                )}
              </View>
            )}
            name="costoTipoEntrada3"
          />
        </>
      )}


      {(selectedCategoryId === "6" || selectedCategoryId === "11") && countCostoEvento < 3 && (
        <>
          <TouchableOpacity style={{ marginTop: -10, marginBottom: 15 }} onPress={() => {
              setCountCostoEvento(countCostoEvento + 1);
            }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <PlusCircleIcon size={20} color="#E0B942" />
                <Text style={{ color: "#E0B942" }}> Agregar tipo de entrada</Text>
              </View>
          </TouchableOpacity>
        </>
      )}

      {countCostoEvento > 1 && (
        <TouchableOpacity style={{ marginTop: -5, marginBottom: 15 }} onPress={() => {
            setCountCostoEvento(countCostoEvento - 1);
          }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MinusCircleIcon size={20} color="#ff4444" />
              <Text style={{ color: "#ff4444" }}> Eliminar última entrada</Text>
            </View>
          </TouchableOpacity>
        )}



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
            {formState.errors.descripcionEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.descripcionEvento?.message}
              </Text>
            )}
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
            {formState.errors.cpEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.cpEvento?.message}
              </Text>
            )}
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
            {formState.errors.municioEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.municioEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="municioEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>

            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                onPress={() => {
                  if (!isModalVisible3) {
                    setModalVisible3(true);
                  }
                }}
              >
                <Text style={[styles.selectText, !value ? { color: "#858585" } : { color: "#fff" }]}>
                  {value
                    ? estados.find((estado) => estado.estadoID === Number(value))?.nombreEstado
                    : "Selecciona un estado"}
                </Text>
              </TouchableOpacity>
            ) : (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#E0B942",
                  borderRadius: 8,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Picker.Item label="Selecciona un estado" value="" style={styles.pickerItem} />
                {estados.map((estado) => (
                  <Picker.Item
                    key={estado.estadoID}
                    label={estado.nombreEstado}
                    value={estado.estadoID.toString()}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            )}

            <Modal isVisible={isModalVisible3}>
              <TouchableWithoutFeedback onPress={() => setModalVisible3(false)}>
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setModalVisible3(false)}>
                          <Text style={styles.modalCancelButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible3(false);
                          }}
                        >
                          <Text style={styles.modalDoneButton}>Listo</Text>
                        </TouchableOpacity>
                      </View>
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                      >
                        <Picker.Item label="Selecciona un estado" value="" />
                        {estados.map((estado) => (
                          <Picker.Item
                            key={estado.estadoID}
                            label={estado.nombreEstado}
                            value={estado.estadoID.toString()}
                          />
                        ))}
                      </Picker>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {formState.errors.estadoID && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.estadoID?.message}
              </Text>
            )}
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
            {formState.errors.direccionEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.direccionEvento?.message}
              </Text>
            )}
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
            {formState.errors.telefonoEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.telefonoEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="telefonoEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha del Evento</Text>
            {Platform.OS !== "ios" ? (
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.dateTimeText, { color: "#fff" }]}>{value.toDateString()}</Text>
              </TouchableOpacity>
            ) : (
              <DateTimePicker
                value={value}
                mode="date"
                display={Platform.OS === "ios" ? "compact" : "default"}  // Usar compact en iOS
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false)
                  if (selectedDate) {
                    onChange(selectedDate)
                  }
                }}
              />
            )}
            {showDatePicker && (
              <DateTimePicker
                value={value}
                mode="date"
                display={Platform.OS === "ios" ? "compact" : "default"}  // Usar compact en iOS
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false)
                  if (selectedDate) {
                    onChange(selectedDate)
                  }
                }}
              />
            )}
            {formState.errors.fechaEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.fechaEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="fechaEvento"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora del evento</Text>
            {Platform.OS !== "ios" ? (
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text style={[styles.dateTimeText, { color: "#fff" }]}>
                  {value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
            ) : 
            <DateTimePicker
              value={value}
              mode="time"
              display={Platform.OS === "ios" ? "compact" : "default"}  // Usar compact en iOS
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  onChange(selectedTime);
                }
              }}
            />
            }
            {showTimePicker && (
              <DateTimePicker
                value={value}
                mode="time"
                display={Platform.OS === "ios" ? "compact" : "default"}  
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    onChange(selectedTime);
                  }
                }}
              />
            )}

            {formState.errors.horaEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.horaEvento?.message}
              </Text>
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
              placeholderTextColor="#858585"
            />
            {formState.errors.duracionEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.duracionEvento?.message}
              </Text>
            )}
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
              placeholderTextColor="#858585"
            />
            {formState.errors.kitEvento && (
              <Text style={{ color: "#ff4444", fontSize: 14, marginTop: 4, marginLeft: 4 }}>
                {formState.errors.kitEvento?.message}
              </Text>
            )}
          </View>
        )}
        name="kitEvento"
      />
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
        </View>

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
    backgroundColor: "#0F0F0F",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#fff",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0B942",
    borderRadius: 8,
    color: "#fff",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#1A1A1A",
    height: 50,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  dateTimeText: {
    fontSize: 16,
    padding: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#E0B942",
    borderRadius: 8,
    color: "#fff",
    height: 50,
  },
  submitButton: {
    backgroundColor: "#E0B942",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 40,
    height: 56,
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#0A0A0A",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  pickerItem: {
    color: Platform.select({
      ios: '#000', 
      android: '#fff'
    }),
    backgroundColor: '#1A1A1A',
  },
  selectText: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 12,
    textAlign: 'left',
    backgroundColor: '#1A1A1A',
    paddingTop: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0B942",
    padding: 12,
    height: 50,
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalCancelButton: {
    color: '#007AFF',
    fontSize: 17,
  },
  modalDoneButton: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
})

