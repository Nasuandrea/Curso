# Definir variables con una cadena
x = "El valor de (a+b)*c es"

# Podemos realizar múltiples asignaciones
a,b,c = 4,3,8

# Podemos realizar operaciones a,b,c
d = (a+b)*c

# Definir variable booleana - primera letra en mayúscula
imprimir = True

# Condicional Si imprimir, print()
if imprimir:
    print(x,d)

"""
Esto es un comentario 
de varias lineas
"""

y = 63
z = 22

w = "esto es una sentencia"; m = "esta al lado de otra"
print (w,m)

j= 6+3+9+8 +\
9+5+8+2
print(j)

k=(6+3+9+8+
9+5+8+2)
print(k)

# Funciones 
def nombreFuncion (a,b,c):
    return a+b+c

d = nombreFuncion(10,
                  23,
                  3)
print(d)

# Variables nombres:

_variable = 88
vari_able = 99
variable10 = 10
variable = 5
variAble = 5

""" No permitidos: 
2variable = 88
var-iable = 33
var iable = 88
"""

# Nombres reservados (imprime por consola los nombres reservados)
import keyword
print(keyword.kwlist)

# Paréntesis

m = 10
n = m*3-3**10-2+3
print(n)

n=(m*3-3) ** (10-2)+3
print(n)