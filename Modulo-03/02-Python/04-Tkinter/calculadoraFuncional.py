import tkinter as tk
from tkinter import ttk, messagebox
import math

class CalculadoraTkinter:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculadora Avanzada")
        self.root.geometry("500x600")
        self.root.resizable(False, False)
        self.root.configure(bg="#f0f0f0")
        
        # Variables para almacenar los números
        self.num1 = tk.StringVar()
        self.num2 = tk.StringVar()
        self.resultado = tk.StringVar()
        self.operacion_actual = tk.StringVar(value="")
        
        # Configurar estilos
        self.setup_styles()
        
        # Crear interfaz
        self.crear_interfaz()
        
    def setup_styles(self):
        """Configura estilos para la aplicación"""
        style = ttk.Style()
        style.theme_use('clam')
        
        # Configurar colores
        style.configure('Title.TLabel', 
                       font=('Arial', 24, 'bold'),
                       background='#f0f0f0',
                       foreground='#2c3e50')
        
        style.configure('Result.TLabel',
                       font=('Arial', 18, 'bold'),
                       background='#ecf0f1',
                       foreground='#2c3e50')
        
        style.configure('Operacion.TLabel',
                       font=('Arial', 16),
                       background='#f0f0f0',
                       foreground='#7f8c8d')
        
        style.configure('Num.TEntry',
                       font=('Arial', 14),
                       padding=10)
        
        style.configure('Operacion.TButton',
                       font=('Arial', 12, 'bold'),
                       padding=10,
                       background='#3498db',
                       foreground='white')
        
        style.configure('Calcular.TButton',
                       font=('Arial', 14, 'bold'),
                       padding=15,
                       background='#2ecc71',
                       foreground='white')
        
        style.configure('Limpiar.TButton',
                       font=('Arial', 12),
                       padding=10,
                       background='#e74c3c',
                       foreground='white')
    
    def crear_interfaz(self):
        """Crea todos los elementos de la interfaz gráfica"""
        
        # Frame principal
        main_frame = ttk.Frame(self.root, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Título
        titulo = ttk.Label(main_frame, text="🧮 CALCULADORA Tkinter", 
                          style='Title.TLabel')
        titulo.grid(row=0, column=0, columnspan=4, pady=(0, 30))
        
        # Frame para entrada de números
        input_frame = ttk.LabelFrame(main_frame, text="Datos de Entrada", padding=15)
        input_frame.grid(row=1, column=0, columnspan=4, pady=(0, 20), sticky=(tk.W, tk.E))
        
        # Entrada para primer número
        ttk.Label(input_frame, text="Primer número:", font=('Arial', 12)).grid(
            row=0, column=0, padx=(0, 10), pady=5, sticky=tk.W)
        
        num1_entry = ttk.Entry(input_frame, textvariable=self.num1, 
                              width=20, style='Num.TEntry')
        num1_entry.grid(row=0, column=1, padx=(0, 20), pady=5)
        num1_entry.bind('<Return>', lambda e: self.calcular())
        
        # Entrada para segundo número
        ttk.Label(input_frame, text="Segundo número:", font=('Arial', 12)).grid(
            row=1, column=0, padx=(0, 10), pady=5, sticky=tk.W)
        
        num2_entry = ttk.Entry(input_frame, textvariable=self.num2, 
                              width=20, style='Num.TEntry')
        num2_entry.grid(row=1, column=1, padx=(0, 20), pady=5)
        num2_entry.bind('<Return>', lambda e: self.calcular())
        
        # Frame para operaciones
        operaciones_frame = ttk.LabelFrame(main_frame, text="Operaciones", padding=15)
        operaciones_frame.grid(row=2, column=0, columnspan=4, pady=(0, 20), sticky=(tk.W, tk.E))
        
        # Botones de operaciones
        operaciones = [
            ('➕ Suma', '+', self.sumar),
            ('➖ Resta', '-', self.restar),
            ('✖️ Multiplicación', '×', self.multiplicar),
            ('➗ División', '÷', self.dividir),
            ('⚡ Potencia', '^', self.potencia)
        ]
        
        for i, (texto, simbolo, comando) in enumerate(operaciones):
            btn = ttk.Button(operaciones_frame, text=texto,
                           command=lambda s=simbolo, f=comando: self.seleccionar_operacion(s, f),
                           style='Operacion.TButton')
            btn.grid(row=i//3, column=i%3, padx=5, pady=5, sticky=tk.EW)
        
        # Etiqueta de operación seleccionada
        self.lbl_operacion = ttk.Label(main_frame, textvariable=self.operacion_actual,
                                      style='Operacion.TLabel')
        self.lbl_operacion.grid(row=3, column=0, columnspan=4, pady=(10, 5))
        
        # Frame para resultado
        resultado_frame = ttk.LabelFrame(main_frame, text="Resultado", padding=15)
        resultado_frame.grid(row=4, column=0, columnspan=4, pady=(0, 20), sticky=(tk.W, tk.E))
        
        # Mostrar resultado
        resultado_label = ttk.Label(resultado_frame, textvariable=self.resultado,
                                   style='Result.TLabel')
        resultado_label.grid(row=0, column=0, pady=10)
        
        # Botones de acción
        botones_frame = ttk.Frame(main_frame)
        botones_frame.grid(row=5, column=0, columnspan=4, pady=(10, 0))
        
        # Botón calcular
        btn_calcular = ttk.Button(botones_frame, text="CALCULAR",
                                 command=self.calcular,
                                 style='Calcular.TButton')
        btn_calcular.grid(row=0, column=0, padx=(0, 10))
        
        # Botón limpiar
        btn_limpiar = ttk.Button(botones_frame, text="Limpiar",
                                command=self.limpiar,
                                style='Limpiar.TButton')
        btn_limpiar.grid(row=0, column=1)
        
        # Variables internas
        self.funcion_actual = None
        self.simbolo_actual = ""
        
        # Configurar columnas para que se expandan
        for i in range(4):
            main_frame.columnconfigure(i, weight=1)
        
        for i in range(3):
            operaciones_frame.columnconfigure(i, weight=1)
    
    def seleccionar_operacion(self, simbolo, funcion):
        """Selecciona una operación matemática"""
        self.simbolo_actual = simbolo
        self.funcion_actual = funcion
        self.operacion_actual.set(f"Operación seleccionada: {simbolo}")
    
    def validar_entrada(self):
        """Valida que las entradas sean números válidos"""
        try:
            num1_str = self.num1.get().strip()
            num2_str = self.num2.get().strip()
            
            if not num1_str or not num2_str:
                messagebox.showwarning("Advertencia", "Por favor, ingresa ambos números")
                return None, None
            
            num1 = float(num1_str)
            num2 = float(num2_str)
            return num1, num2
            
        except ValueError:
            messagebox.showerror("Error", "❌ Entrada inválida. Ingresa números válidos.")
            return None, None
    
    def calcular(self):
        """Realiza el cálculo con la operación seleccionada"""
        if not self.funcion_actual:
            messagebox.showwarning("Advertencia", "Por favor, selecciona una operación")
            return
        
        numeros = self.validar_entrada()
        if numeros[0] is None:
            return
        
        num1, num2 = numeros
        
        try:
            resultado = self.funcion_actual(num1, num2)
            
            # Formatear el resultado
            if isinstance(resultado, float) and resultado.is_integer():
                resultado = int(resultado)
            
            # Mostrar el resultado con formato
            self.resultado.set(f"{num1} {self.simbolo_actual} {num2} = {resultado}")
            
            # Si es decimal, mostrar aproximación
            if isinstance(resultado, float):
                self.resultado.set(f"{self.resultado.get()}\n(Aproximado: {resultado:.4f})")
                
        except ValueError as e:
            messagebox.showerror("Error", f"❌ {str(e)}")
            self.resultado.set("Error en el cálculo")
        except Exception as e:
            messagebox.showerror("Error", f"⚠️ Error inesperado: {str(e)}")
            self.resultado.set("Error inesperado")
    
    def limpiar(self):
        """Limpia todos los campos"""
        self.num1.set("")
        self.num2.set("")
        self.resultado.set("")
        self.operacion_actual.set("")
        self.funcion_actual = None
        self.simbolo_actual = ""
    
    # Funciones matemáticas (iguales a las originales)
    def sumar(self, a, b):
        return a + b
    
    def restar(self, a, b):
        return a - b
    
    def multiplicar(self, a, b):
        return a * b
    
    def dividir(self, a, b):
        if b == 0:
            raise ValueError("No se puede dividir entre cero")
        return a / b
    
    def potencia(self, a, b):
        return a ** b

def main():
    """Función principal para ejecutar la aplicación"""
    root = tk.Tk()
    app = CalculadoraTkinter(root)
    root.mainloop()

if __name__ == "__main__":
    main()