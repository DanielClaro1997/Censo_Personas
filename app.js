//configuración personal de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCYjjw0q7jQ3YJFZ1ojkOo2ZgDmzyt8Mro",
  authDomain: "censo-df9e8.firebaseapp.com",
  projectId: "censo-df9e8",
});
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos
function guardar(){
    var DNI = document.getElementById('DNI').value;
    var nombre= document.getElementById('nombre').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var direccion= document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;

    db.collection("usuario").add({
        DNI: DNI,
        NOMBRE: nombre,
        FECNAC: fechaNacimiento,
        DIR: direccion,
        TFNO: telefono

    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('DNI').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('fechaNacimiento').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('telefono').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("usuario").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().NOMBRE}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().DNI}</td>
        <td>${doc.data().NOMBRE}</td>
        <td>${doc.data().FECNAC}</td>
        <td>${doc.data().DIR}</td>
        <td>${doc.data().TFNO}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">ELIMINAR</button></td>
        <td><button class="btn btn-dark" onclick="editar('${doc.id}','${doc.data().DNI}','${doc.data().NOMBRE}','${doc.data().FECNAC}','${doc.data().DIR}','${doc.data().TFNO}')">EDITAR</button></td>
        </tr>
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("usuario").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//editar documentos
function editar(id,DNI,nombre,fechaNacimiento,direccion,telefono){

    document.getElementById('DNI').value = DNI;
    document.getElementById('nombre').value = nombre;
    document.getElementById('fechaNacimiento').value = fechaNacimiento;
    document.getElementById('direccion').value = direccion;
    document.getElementById('telefono').value = telefono;
    var boton = document.getElementById('boton');

    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("usuario").doc(id);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('DNI').value;
        var apellido = document.getElementById('nombre').value;
        var fecha = document.getElementById('fechaNacimiento').value;
        var telefono = document.getElementById('direccion').value;
        var direccion = document.getElementById('telefono').value;

        return washingtonRef.update({
            DNI: DNI,
            NOMBRE: nombre,
            FECNAC: fechaNacimiento,
            DIR: direccion,
            TFNO: telefono
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('DNI').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('fechaNacimiento').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('telefono').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}

