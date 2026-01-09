#Funciones
"""
Que el programa tenga un menu con opciones:
contacto
buscar contacto
lista todos
salir

Almacenar contactos en un diccionario (Nombre:Telefono)
Usar funciones para organizar el código
Diccionario en python se identifica {}
"""

contactos ={}
def mostrar_menu():
    print("\n === GESTIÓN DE USUARIOS ===")
    print("1 - Añadir contacto")
    print("2 - Buscar contacto")
    print("3 - Listar todos los contactos")
    print("4 - Salir")

def anhadir_contactos():
    nombre = input("Escribe el nombre del contacto: ")
    telefono = input("Escribe el telefono del contacto: ")
    contactos[nombre] = telefono
    print("Contacto %s añadido correctamente" % nombre)

def buscar_contacto():
    nombre = input("Nombre contacto a buscar: ")
    if nombre in contactos:
        print("Telefono de %s: %s" % (nombre, contactos[nombre]))
    else:
        print("No existe el contacto",nombre)

def listar_contactos():
    if len(contactos) == 0:
        print("No existen contactos")
    else:
        print("\n--- LISTA DE CONTACTOS ---")
        for nombre, telefono in contactos.items():
            print("%s: %s" % (nombre, telefono))

while True:
    mostrar_menu()
    opcion = input("\n Elige una opcion: ")
    if opcion == "1":
        anhadir_contactos()
    elif opcion == "2":
        buscar_contacto()
    elif opcion == "3":
        listar_contactos()
    elif opcion == "4":
        print("Hasta pronto")
        break
    else:
        print("Opcion no válida")
