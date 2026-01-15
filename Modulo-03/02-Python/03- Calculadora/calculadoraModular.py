# Calculadora Modular
def solicitar_numero(mensaje):
    # Solicita un numero al usuaro con validación
    while True:
        try:
            return float(input(mensaje))
        except ValueError:
            print("Error. Ingresa un número")

# Funciones de las operaciones 
def sumar(num1, num2):
    return num1+num2

def restar(num1, num2):
    return num1-num2

def multiplicar(num1,num2):
    return num1*num2

def dividir(num1,num2):
        if num2 == 0:
            # raise: palabra reservada para lanzar/manejar excepciones de forma manual. Un error intencionado
            raise ValueError("No se puede dividir entre 0") 
        return num1/num2

def potencia(num1,num2):
    return num1**num2

def calculadora_modular():
    operaciones = {
        "1": ("Suma", sumar, "+"),
        "2": ("Resta", restar, "-"),
        "3": ("Multiplicación", multiplicar, "*"),
        "4": ("División", dividir, "÷"),
        "5": ("Potencia", potencia, "^")
    }
    while True:
        print("\n"+"~"*50)
        print("|"+" "*14 +"CALCULADORA  MODULAR"+ " "*14 + "|")
        print("~"*50)

        for tecla , (nombre,_,simbolo) in operaciones.items():
            print(f"{tecla}.{nombre}({simbolo})")

        print("6.Salir")
        print("_"*50)

        opcion = input("\nSelecciona: ").strip()

        if opcion == '6':
            print("Programa finalizado")
            break
        if opcion not in operaciones:
            print("Opción no válida")
            continue
        # Obtener datos
        nombre_funcion, funcion, simbolo = operaciones[opcion]
        print(f"\n Operación {nombre_funcion}")

        num1= solicitar_numero("Primer número")
        num2= solicitar_numero("Segundo número")

        #Realizar las operaciones
        try:
            resultado = funcion(num1,num2)

        # Mostrar el resultado de la operacion (decorado)
            print("\n"+ "-"*50)
            print(f" {num1}{simbolo}{num2}={resultado}")

        # Formato decimal amplio
            if isinstance(resultado, float):
                print(f"    Aproximado: {resultado:4f}")
                print("_"*50)
        
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"Error inesperado: {e}")

if __name__ == "__main__":
    calculadora_modular()