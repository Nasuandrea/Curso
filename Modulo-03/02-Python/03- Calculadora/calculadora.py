# Calculadora simple
# version 1.0 - Operaciones Básicas

def mostrar_menu():#Mostrar al usuario las opciones del menú
    print("\n" + "="*40)
    print(   "CALCULADORA PYTHON")
    print("="*40)
    print("1. Suma (+)")
    print("2. Resta (-)")
    print("3. Multiplicación (*)")
    print("4. División (/)")
    print("5. Potencia (^)")
    print("6. Salir")
    print("="*40)

def calcular():# Función principal de la calculadora
    #Bucle infinito hasta que el usuario quiera salir
    while True:
        mostrar_menu()
        try:
            #Paso 1: pedir una operación
            option = input("\nSelecciona una opción (1-6): ").strip()
            #Paso 2: si elige salir
            if option == "6":
                print("\nGracias por usar la calculadora")
                break
            #Paso 3: validar opción
            if option not in ["1","2","3","4","5","6"]:
                print("Opción no válida. Usa un número del 1 al 6")
                continue #vuelve al inicio del bucle
            #Paso 4: Pedir los números para operar
            print("\n" + "-"*30)
            try:
                num1= float(input("Ingresa el primer número: "))
                num2= float(input("Ingresa el segundo número: "))
            except ValueError:
                print("Error debes inbgresar número válido")
                continue
            #Paso 5: Realizar la operación seleccionada
            resultado = None
            operacion = ""
            if option == "1": #Suma
                resultado = num1 + num2
                operacion = f"{num1} + {num2}"
                simbolo = "+"
            elif option == "2": #Resta
                resultado = num1 - num2
                operacion = f"{num1} - {num2}"
                simbolo = "-"
            elif option == "3": #Multiplicación
                resultado = num1 * num2
                operacion = f"{num1} * {num2}"
                simbolo = "*"
            elif option == "4": #División
                if num2 == 0:
                    print("Error:  No se puede dividir entre 0")
                resultado = num1 / num2
                operacion = f"{num1} ÷ {num2}"
                simbolo = "÷"
            elif option == "5": #Potencia
                if num2 == 0:
                    print("Error:  No se puede dividir entre 0")
                resultado = num1 ** num2
                operacion = f"{num1} ^ {num2}"
                simbolo = "^"
            # Paso 6: Mostrar el resultado
            print("\n"+ "-"*40)
            print(f"RESULTADO: {operacion} = {resultado}")

            # Preguntar si quiere realizar otra operación (S/N)
            continuar = input("\n¿Desea realizar otra operación? (S/N)").lower()
            if continuar != "s":
                print("Gracias por usar la calculadora")
                break
        except KeyboardInterrupt:
            print("\nPrograma interrumpido")
            break
        except Exception as e:
            print(f"\nError:  {e}")

# Punto de entrada del programa
if __name__ == "__main__":
    print ("Iniciando calculadora ...")
    calcular()
