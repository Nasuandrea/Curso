#El int() convierte a entero lo que va a meter por teclado, 
#siempre se toma como string lo que entre por teclado por eso hay que convertirlo a int
x = int(input("Escribe un número entero:"))
if x < 0:
    x = 0
    print('Numero negativo cambia a 0')
elif x == 0:
    print('Cero')
elif x == 1:
    print("Uno")
else :
    print('Diferente a 0, 1 o negativo')

# For, Array
palabras = ['gato', 'ventana', 'avión', 'estrafalario']
# Saber la cantidad de letras que tiene cada una de las palabras
# para cada elemento p del array palabras 
for p in palabras:
    #imprime el elemento(p) y la length del elemento (p)
    print(p, len(p))

# Diccionario -> Elemento: Definición
# Crear una coleccion/diccionario
usuario = {'Marta' : 'online', 'Peter' : 'online', 'Carlos' : 'offline'}

# Los usuarios desactivados eliminalos
for u, status in usuario.copy().items():
    if status == 'offline' :
        del usuario[u]
print("Usuario eliminado:",u)
print(f"Después de eliminar: {usuario}")

usuario = {'Marta' : 'online', 'Peter' : 'online', 'Carlos' : 'offline'}
#Crear una coleccion nueva
activar_usuario = {u:status for usuario, status in usuario.items()
                   if status == 'online'}
print (f'Usuarios reactivados: {activar_usuario}')

