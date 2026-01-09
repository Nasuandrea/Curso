#comentario un linea
"""
comentario
de
varias lineas
"""

print ("Buenos dias people")

#crear variables

a = 12
b = 25
print(a,b)

print(a+b)

#condicional

if a == 30:
    print("la variable a es 30")
else:
    print("la variable a No es 30")
#la coma es un separador 
c=12

#numero decimal
d=12.5

print(c,d)

#definir una variable  e con una cadena
e= "El valor de (a+b)*c es: ", (a+b)*c

print(e)

#podemos realizar multiple asignaciones
a,b,c = 15,16,17

print (a, b, c)

e= "El valor de (a+b)*c es: ", (a+b)*c
print(e)

#constantes en python se definen con MAYUSCULAS con guiones bajos. Variables que no deberian modificarse

PI=3.1416
VELOCIDAD_LUZ=299792458 #m/s
DIAS_SEMANA=7
NOMBRE_APLICACION="MiApp"

#relacion usando enumeracion (enum)

from enum import Enum

class Color(Enum):
    ROJO="#FF0000"
    VERDE="#00FF00"
    AZUL="#0000FF"

print(Color.ROJO.value)