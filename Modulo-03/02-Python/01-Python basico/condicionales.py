# Es divisible entre 4 y no es divisible entre 100, Excepto que tambien sea divisible entre 400
# Ejemplo 2000 bisiesto , 1900 no bisiesto, 2024 bisiesto

#pedimos al usuario que introduzca el año
year=int(input("Introduce un año: "))

#Usamos el operador % para verificar divisibilidad
# Si year % 4 == 0 es divisible entre 4

# Si es divisible entre 400 siempre es bisiesto
if year % 400 == 0:    
    print ("%d es un año bisiesto"% year)
# Si es divisible entre 400 pero no entre 400 , no es bisiesto
elif year % 100 == 0:
    print ("%d no es un año bisiesto"% year)
# Si es divisible entre 4 pero no entre 100 es bisiesto
elif year % 4 == 0:
    print ("%d es bisiesto"% year)
# En cualquier otro caso no es Bisiesto
else:
    print ("%d no es bisiesto"% year)