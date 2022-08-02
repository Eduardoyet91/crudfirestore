<!-- This example requires Tailwind CSS v2.0+ -->
<template>
     
<div class="grid grid-cols-3">
  <div class="col-span-1"><div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
         <div v-show="!cambiar" >
               <h2  class="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrate</h2>
              
       
      </div>
       <div v-show="cambiar" >
               
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Editar Registro</h2>
       
      </div>
               
       
      </div>
      
        
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label >Nombre</label>
            <input  v-model="nombre"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  />
          </div>
           <div>
            <label>Correo</label>
            <input   v-model="correo"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  />
          </div>
          <div>
            <label >Telefono</label>
            <input  v-model="telefono"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
          </div>
        </div>

       

        <div>
          <button v-show="!cambiar" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="insertarUser">
            Registrar
          </button>
           <button v-show="cambiar" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="editarUser(ident),cambiar=false">
            Guardar Cambios
          </button>
        </div>
    
    </div>
  </div></div>
  <div class="px-4 sm:px-6 lg:px-8 col-span-2">
  
   
    
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                 
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                   <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">telefono</th>
                  
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Editar</span>
                    <span class="sr-only">Eliminar</span>
                    
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(usuario,index) in usuarios" :key="index">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{usuario.data().nombre}}</td>
                 
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ usuario.data().correo }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ usuario.data().telefono }}</td>
                  
                  
                  <td class="relative whitespace-nowrap flex py-4 pl-3 pr-4 text-right gap-3 text-sm font-medium sm:pr-6">
                           <button @click="eliminarUser(usuario.id),cambiar=false" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Eliminar</button>
        <button @click="cargarDatos(usuario.data().nombre,usuario.data().correo,usuario.data().telefono ),cambiar=true,ident=usuario.id" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Editar</button>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div> 
    </div>
  </div>
  <div></div>
  </div>
  
</template>

<script>

import { ref } from 'vue';
import app from "../firebase.js";
import { getFirestore, collection, getDocs,addDoc,doc, deleteDoc,updateDoc} from 'firebase/firestore/lite';
const db = getFirestore(app);





export default {

    data() {
        return {
            usuarios : [],
            id:"",
            nombre: "" ,
            correo: "",
            telefono: 0
            
        }
    } , mounted() {
       this.getAll()
    } , methods :
    
    {   async getAll() {
           const querySnapshot = await getDocs(collection(db, "usuario"));
                this.usuarios = querySnapshot.docs;
               

                      } ,

        async insertarUser() { 
            try {
                    const docRef = await addDoc(collection(db, "usuario"), {
                    nombre: this.nombre,
                    correo: this.correo,
                    telefono: this.telefono, 
                    

                 });
                } catch (e) {
                    console.error("Error adding document: ", e);
                        }
                   this.nombre = "",
                   this.correo = "",
                     this.telefono = "",
            this.getAll();
                                    } ,
       
        async eliminarUser(id) {  try {

          await deleteDoc(doc(db, "usuario", id));
           
            } catch (e) {
                console.error("Errordeleting document: ", e);
            }
            this.nombre = ""
            this.correo = ""
             this.telefono =""
             this.getAll();
        },


        cargarDatos(nombre, cantidad,telefono) {
          this.nombre = nombre;
            this.correo = cantidad;
             this.telefono = telefono;
            
        } ,


    async editarUser(id) {  try {
              const editar = doc(db, "usuario", id);
                  await updateDoc(editar, {
                    nombre: this.nombre,
                    correo: this.correo,
                    telefono: this.telefono, 
});
           
            } catch (e) {
                console.error("Errordeleting document: ", e);
            }
            this.nombre = ""
            this.correo = ""
             this.telefono =""
             this.getAll();
        },
    },
  setup() {
   const open = ref(false)
   const cambiar = ref(false)
   const ident=""
    return {
      open,
      cambiar,
      ident
    }
  },
  

}

</script>