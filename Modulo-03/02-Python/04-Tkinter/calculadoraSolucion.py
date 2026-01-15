import tkinter as tk
from tkinter import font

class Calculadora:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculadora")
        self.root.geometry("400x550")
        self.root.configure(bg="#2b2b2b")
        
        # Variables para almacenar la operación
        self.operacion = ""
        self.resultado = 0
        self.operador = ""
        self.nueva_operacion = True
        
        # Configurar fuentes
        self.fuente_display = font.Font(family="Arial", size=24)
        self.fuente_botones = font.Font(family="Arial", size=16, weight="bold")
        
        # Crear interfaz
        self.crear_display()
        self.crear_botones()
        
    def crear_display(self):
        # Frame para el display
        frame_display = tk.Frame(self.root, height=100, bg="#2b2b2b")
        frame_display.pack(fill=tk.BOTH, padx=10, pady=(10, 5))
        
        # Display principal
        self.display = tk.Entry(
            frame_display,
            font=self.fuente_display,
            bg="#1e1e1e",
            fg="white",
            borderwidth=0,
            justify=tk.RIGHT,
            insertbackground="white"
        )
        self.display.pack(fill=tk.BOTH, expand=True)
        self.display.insert(0, "0")
        
        # Display secundario (para mostrar la operación)
        self.display_secundario = tk.Label(
            frame_display,
            font=("Arial", 12),
            bg="#2b2b2b",
            fg="#aaaaaa",
            anchor=tk.E
        )
        self.display_secundario.pack(fill=tk.BOTH)
        
    def crear_botones(self):
        # Frame para los botones
        frame_botones = tk.Frame(self.root, bg="#2b2b2b")
        frame_botones.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Configurar grid
        for i in range(5):
            frame_botones.grid_rowconfigure(i, weight=1)
        for i in range(4):
            frame_botones.grid_columnconfigure(i, weight=1)
        
        # Definir botones
        botones = [
            ("C", 0, 0, 1, 2, "#d32f2f", "#ffffff"),  # Rojo, ocupa 2 columnas
            ("⌫", 0, 2, 1, 1, "#616161", "#ffffff"),
            ("÷", 0, 3, 1, 1, "#ff9800", "#ffffff"),
            
            ("7", 1, 0, 1, 1, "#424242", "#ffffff"),
            ("8", 1, 1, 1, 1, "#424242", "#ffffff"),
            ("9", 1, 2, 1, 1, "#424242", "#ffffff"),
            ("×", 1, 3, 1, 1, "#ff9800", "#ffffff"),
            
            ("4", 2, 0, 1, 1, "#424242", "#ffffff"),
            ("5", 2, 1, 1, 1, "#424242", "#ffffff"),
            ("6", 2, 2, 1, 1, "#424242", "#ffffff"),
            ("-", 2, 3, 1, 1, "#ff9800", "#ffffff"),
            
            ("1", 3, 0, 1, 1, "#424242", "#ffffff"),
            ("2", 3, 1, 1, 1, "#424242", "#ffffff"),
            ("3", 3, 2, 1, 1, "#424242", "#ffffff"),
            ("+", 3, 3, 1, 1, "#ff9800", "#ffffff"),
            
            ("±", 4, 0, 1, 1, "#424242", "#ffffff"),
            ("0", 4, 1, 1, 1, "#424242", "#ffffff"),
            (".", 4, 2, 1, 1, "#424242", "#ffffff"),
            ("=", 4, 3, 1, 1, "#ff9800", "#ffffff")
        ]
        
        # Crear botones
        for texto, fila, columna, rowspan, colspan, color, color_texto in botones:
            # Botones especiales para operadores y funciones
            if texto in ["C", "⌫", "±"]:
                btn = tk.Button(
                    frame_botones,
                    text=texto,
                    font=self.fuente_botones,
                    bg=color,
                    fg=color_texto,
                    borderwidth=0,
                    activebackground="#757575" if color == "#424242" else "#e64a19",
                    activeforeground="#ffffff",
                    command=lambda t=texto: self.boton_presionado(t)
                )
            else:
                btn = tk.Button(
                    frame_botones,
                    text=texto,
                    font=self.fuente_botones,
                    bg=color,
                    fg=color_texto,
                    borderwidth=0,
                    activebackground="#757575" if color == "#424242" else "#ffb74d",
                    activeforeground="#ffffff",
                    command=lambda t=texto: self.boton_presionado(t)
                )
            
            btn.grid(
                row=fila, 
                column=columna, 
                rowspan=rowspan, 
                columnspan=colspan, 
                sticky="nsew", 
                padx=2, 
                pady=2
            )
    
    def boton_presionado(self, valor):
        # Obtener el valor actual del display
        display_valor = self.display.get()
        
        if valor == "C":
            # Limpiar todo
            self.display.delete(0, tk.END)
            self.display.insert(0, "0")
            self.display_secundario.config(text="")
            self.operacion = ""
            self.resultado = 0
            self.operador = ""
            self.nueva_operacion = True
            
        elif valor == "⌫":
            # Eliminar último carácter
            if len(display_valor) > 1:
                nuevo_valor = display_valor[:-1]
                self.display.delete(0, tk.END)
                self.display.insert(0, nuevo_valor)
            else:
                self.display.delete(0, tk.END)
                self.display.insert(0, "0")
                self.nueva_operacion = True
                
        elif valor == "±":
            # Cambiar signo
            if display_valor != "0":
                if display_valor[0] == "-":
                    nuevo_valor = display_valor[1:]
                else:
                    nuevo_valor = "-" + display_valor
                self.display.delete(0, tk.END)
                self.display.insert(0, nuevo_valor)
                
        elif valor in ["+", "-", "×", "÷"]:
            # Operadores
            if self.operador and not self.nueva_operacion:
                # Calcular resultado previo si hay una operación pendiente
                self.calcular()
                
            self.operador = valor
            self.resultado = float(display_valor)
            self.nueva_operacion = True
            
            # Mostrar operación en display secundario
            simbolo = {"+": "+", "-": "-", "×": "×", "÷": "÷"}[valor]
            self.display_secundario.config(text=f"{self.resultado} {simbolo}")
            
        elif valor == "=":
            # Calcular resultado
            if self.operador:
                self.calcular()
                self.operador = ""
                self.display_secundario.config(text="")
                
        elif valor == ".":
            # Punto decimal
            if self.nueva_operacion:
                self.display.delete(0, tk.END)
                self.display.insert(0, "0.")
                self.nueva_operacion = False
            elif "." not in display_valor:
                self.display.insert(tk.END, ".")
                
        else:
            # Números (0-9)
            if self.nueva_operacion or display_valor == "0":
                self.display.delete(0, tk.END)
                self.display.insert(0, valor)
                self.nueva_operacion = False
            else:
                self.display.insert(tk.END, valor)
            
            # Actualizar display secundario si hay una operación en curso
            if self.operador:
                simbolo = {"+": "+", "-": "-", "×": "×", "÷": "÷"}[self.operador]
                self.display_secundario.config(text=f"{self.resultado} {simbolo}")
    
    def calcular(self):
        try:
            valor_actual = float(self.display.get())
            
            if self.operador == "+":
                self.resultado += valor_actual
            elif self.operador == "-":
                self.resultado -= valor_actual
            elif self.operador == "×":
                self.resultado *= valor_actual
            elif self.operador == "÷":
                if valor_actual != 0:
                    self.resultado /= valor_actual
                else:
                    self.display.delete(0, tk.END)
                    self.display.insert(0, "Error")
                    self.display_secundario.config(text="")
                    return
            
            # Formatear resultado (eliminar .0 si es entero)
            if self.resultado.is_integer():
                resultado_formateado = str(int(self.resultado))
            else:
                resultado_formateado = str(round(self.resultado, 10)).rstrip('0').rstrip('.')
                
            self.display.delete(0, tk.END)
            self.display.insert(0, resultado_formateado)
            self.nueva_operacion = True
            
        except ValueError:
            self.display.delete(0, tk.END)
            self.display.insert(0, "Error")
            self.display_secundario.config(text="")

# Función principal
def main():
    root = tk.Tk()
    calculadora = Calculadora(root)
    root.mainloop()

if __name__ == "__main__":
    main()