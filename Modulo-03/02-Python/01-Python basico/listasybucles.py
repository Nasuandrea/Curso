# Pedir al usuario 5 numeros, los almacene en una lista, calcule y muestre la suma, calcula y muestre promedio, encuentre y muestre el numero mayor y menor

# Listas en python se identifican con []
listaNumeros = []

# Usamos bucle for con range para repetir 5 veces
for i in range(5):
    listaNumeros.append (float(input("Dime el %d numero: "%(i+1))))

#calcular suma
suma = sum(listaNumeros)

#Calculamos el promedio
promedio = suma/len(listaNumeros)

#Número mayor y menor de la lista con funciones max() y min()
mayor = max(listaNumeros)
menor = min(listaNumeros)

#Mostrar resultados
print("Lista de números: ",listaNumeros)
#Mostramos con dos decimales
print("La suma es: %.2f"%suma)
print("El promedio es: %.2f"%promedio)
print("El mayor número es: %.2f"%mayor)
print("El menor número es: %.2f"%menor)

# Lista Colecciones ordenadas y mutables []
# append() añadir elemento al final de la lista
# range() genera secuencias de numeros
# funciones integradas sum() len() max() min()
# bucle for-in itera sobre secuencias