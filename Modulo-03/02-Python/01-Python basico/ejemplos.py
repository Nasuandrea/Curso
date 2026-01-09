# Pedimos los datos al usuario usando raw_input
# raw_input siempre devuelve una cadena (string)
ancho_str = raw_input("Introduce el ancho del rectángulo: ")
alto_str = raw_input("Introduce el alto del rectángulo: ")

# Convertimos las cadenas a números de tipo float
# Usamos float() en lugar de int() para permitir decimales
ancho = float(ancho_str)
alto = float(alto_str)

# Calculamos el área (multiplicación)
area = ancho * alto

# Calculamos el perímetro (suma y multiplicación)
perimetro = 2 * ancho + 2 * alto
# Alternativa: perimetro = 2 * (ancho + alto)

# Mostramos los resultados con formato
# %.2f significa: mostrar un float con 2 decimales
print ("El área del rectángulo es: ")% area 
print ("El perímetro del rectángulo es:") % perimetro