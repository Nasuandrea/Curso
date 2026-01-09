#crea un programa que calcule el área y perimetro de un rectangulo
"""
pedir al usuario el ancho y el alto del rectangulo
calcular y mostrar el área (ancho x alto)
calcular y mostrar el perimetro (2 x ancho + 2 x alto)
nostrar los resultados con 2 decimales
"""
#CALCULO DEL AREA
#pedir al usuario los datos usando input
#input siempre devuelve una candena (string)
#en algunas ediciones antiguas raw_input
ancho_str=input("Introduce el ancho del rectangulo:")
alto_str=input("Introduce el alto del rectangulo:")

#convertimos las cadenas a numeros de tipo float
#usamos float() en lugar de int() para permitir decimales
ancho=float(ancho_str)
alto=float(alto_str)

#calculo el área (multiplicación)
area=ancho * alto

#CALCULO DEL PERIMETRO
#SUMA Y MULTIPLICACION
perimetro = 2 * ancho + 2 * alto
#altenativa 2*(ancho+alto)

#mostrar los resltado con formato (dos decimales)
# utilizaremos %.2f significa: mostrar un float con 2 decimales
print ("El área del rectangulo es:%.2f" %area)
print ("El perimetro del rectangulo es:%.2f" %perimetro)

"""
Conceptos claves:
tipado dinamico: No declara el tipo de valor Python lo infiere
conversion de tipo: float() convierte string a numero decimal
operadores aritmeticos * (multiplicacion) +(suma)
formato de cadenas: % permite valores en string
"""