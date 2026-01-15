import tkinter as tk
from tkinter import messagebox
import random

class Buscaminas:
    def __init__(self, root):
        self.root = root
        self.root.title("Buscaminas")
        self.root.configure(bg="#f0f0f0")
        
        # Configuraciones del juego
        self.filas = 10
        self.columnas = 10
        self.minas = 15
        self.casillas_descubiertas = 0
        self.juego_terminado = False
        self.primer_click = True
        
        # Colores para números
        self.colores_numeros = {
            1: "blue",
            2: "green",
            3: "red",
            4: "darkblue",
            5: "brown",
            6: "cyan",
            7: "black",
            8: "gray"
        }
        
        # Crear menú superior
        self.crear_menu()
        
        # Crear contador de minas y temporizador
        self.crear_panel_superior()
        
        # Crear tablero
        self.crear_tablero()
        
        # Inicializar juego
        self.inicializar_juego()
    
    def crear_menu(self):
        menubar = tk.Menu(self.root)
        self.root.config(menu=menubar)
        
        menu_juego = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Juego", menu=menu_juego)
        menu_juego.add_command(label="Nuevo juego (F2)", command=self.nuevo_juego)
        menu_juego.add_separator()
        
        menu_dificultad = tk.Menu(menu_juego, tearoff=0)
        menu_juego.add_cascade(label="Dificultad", menu=menu_dificultad)
        menu_dificultad.add_command(label="Principiante (10x10, 15 minas)", 
                                   command=lambda: self.cambiar_dificultad(10, 10, 15))
        menu_dificultad.add_command(label="Intermedio (15x15, 40 minas)", 
                                   command=lambda: self.cambiar_dificultad(15, 15, 40))
        menu_dificultad.add_command(label="Experto (20x20, 80 minas)", 
                                   command=lambda: self.cambiar_dificultad(20, 20, 80))
        
        menu_juego.add_command(label="Salir", command=self.root.quit)
        
        # Atajo de teclado F2 para nuevo juego
        self.root.bind("<F2>", lambda e: self.nuevo_juego())
    
    def crear_panel_superior(self):
        # Panel superior para contadores
        panel_superior = tk.Frame(self.root, bg="#f0f0f0", height=60)
        panel_superior.pack(fill=tk.X, padx=10, pady=(10, 5))
        
        # Contador de minas restantes
        frame_minas = tk.Frame(panel_superior, bg="#f0f0f0")
        frame_minas.pack(side=tk.LEFT, expand=True)
        
        tk.Label(frame_minas, text="Minas:", font=("Arial", 12, "bold"), 
                bg="#f0f0f0").pack(side=tk.LEFT, padx=(0, 5))
        
        self.contador_minas = tk.Label(frame_minas, text=str(self.minas), 
                                       font=("Arial", 14, "bold"), bg="#333", 
                                       fg="red", width=3, relief="sunken")
        self.contador_minas.pack(side=tk.LEFT)
        
        # Botón de reinicio (carita)
        self.boton_reinicio = tk.Button(
            panel_superior, 
            text="😊", 
            font=("Arial", 20), 
            command=self.nuevo_juego,
            bg="#f0f0f0",
            relief="raised",
            bd=2
        )
        self.boton_reinicio.pack(side=tk.LEFT, expand=True)
        
        # Temporizador
        frame_tiempo = tk.Frame(panel_superior, bg="#f0f0f0")
        frame_tiempo.pack(side=tk.RIGHT, expand=True)
        
        tk.Label(frame_tiempo, text="Tiempo:", font=("Arial", 12, "bold"), 
                bg="#f0f0f0").pack(side=tk.LEFT, padx=(0, 5))
        
        self.contador_tiempo = tk.Label(frame_tiempo, text="000", 
                                        font=("Arial", 14, "bold"), bg="#333", 
                                        fg="red", width=3, relief="sunken")
        self.contador_tiempo.pack(side=tk.LEFT)
        
        # Inicializar temporizador
        self.tiempo_transcurrido = 0
        self.actualizar_temporizador()
    
    def crear_tablero(self):
        # Frame para el tablero
        self.frame_tablero = tk.Frame(self.root, bg="#f0f0f0")
        self.frame_tablero.pack(padx=10, pady=5)
        
        # Crear botones del tablero
        self.botones = []
        for fila in range(self.filas):
            fila_botones = []
            for col in range(self.columnas):
                btn = tk.Button(
                    self.frame_tablero,
                    text="",
                    width=2,
                    height=1,
                    font=("Arial", 10, "bold"),
                    relief="raised",
                    bg="#d0d0d0",
                    activebackground="#c0c0c0"
                )
                btn.grid(row=fila, column=col, padx=1, pady=1)
                btn.bind("<Button-1>", lambda e, f=fila, c=col: self.click_izquierdo(f, c))
                btn.bind("<Button-3>", lambda e, f=fila, c=col: self.click_derecho(f, c))
                fila_botones.append(btn)
            self.botones.append(fila_botones)
    
    def inicializar_juego(self):
        # Inicializar tablero lógico
        self.tablero = [[0 for _ in range(self.columnas)] for _ in range(self.filas)]
        self.minas_posiciones = []
        self.banderas = [[False for _ in range(self.columnas)] for _ in range(self.filas)]
        self.reveladas = [[False for _ in range(self.columnas)] for _ in range(self.filas)]
        
        # Reiniciar variables del juego
        self.casillas_descubiertas = 0
        self.juego_terminado = False
        self.primer_click = True
        self.tiempo_transcurrido = 0
        self.actualizar_temporizador()
        self.actualizar_contador_minas()
        
        # Actualizar botón de reinicio
        self.boton_reinicio.config(text="😊")
        
        # Limpiar todos los botones
        for fila in range(self.filas):
            for col in range(self.columnas):
                self.botones[fila][col].config(
                    text="",
                    bg="#d0d0d0",
                    relief="raised",
                    state="normal"
                )
    
    def colocar_minas(self, primera_fila, primera_col):
        # Colocar minas aleatoriamente, evitando la primera casilla clickeada
        self.minas_posiciones = []
        posiciones_disponibles = [
            (f, c) 
            for f in range(self.filas) 
            for c in range(self.columnas) 
            if not (f == primera_fila and c == primera_col)
        ]
        
        # Seleccionar posiciones aleatorias para las minas
        posiciones_minas = random.sample(posiciones_disponibles, self.minas)
        
        for fila, col in posiciones_minas:
            self.tablero[fila][col] = -1  # -1 representa una mina
            self.minas_posiciones.append((fila, col))
            
            # Incrementar contadores de minas adyacentes
            for df in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if df == 0 and dc == 0:
                        continue
                    
                    nf, nc = fila + df, col + dc
                    if 0 <= nf < self.filas and 0 <= nc < self.columnas:
                        if self.tablero[nf][nc] != -1:
                            self.tablero[nf][nc] += 1
    
    def click_izquierdo(self, fila, col):
        if self.juego_terminado or self.banderas[fila][col]:
            return
        
        # Primer click: colocar minas (asegurando que la primera casilla no sea mina)
        if self.primer_click:
            self.primer_click = False
            self.colocar_minas(fila, col)
            # Iniciar temporizador
            self.iniciar_temporizador()
        
        # Revelar casilla
        self.revelar_casilla(fila, col)
        
        # Verificar si ganó
        self.verificar_victoria()
    
    def click_derecho(self, fila, col):
        if self.juego_terminado or self.reveladas[fila][col]:
            return
        
        # Alternar bandera
        if not self.banderas[fila][col]:
            self.banderas[fila][col] = True
            self.botones[fila][col].config(text="🚩", fg="red", relief="sunken")
        else:
            self.banderas[fila][col] = False
            self.botones[fila][col].config(text="", relief="raised")
        
        # Actualizar contador de minas
        self.actualizar_contador_minas()
    
    def revelar_casilla(self, fila, col):
        # Si ya está revelada o tiene bandera, no hacer nada
        if self.reveladas[fila][col] or self.banderas[fila][col]:
            return
        
        # Marcar como revelada
        self.reveladas[fila][col] = True
        self.botones[fila][col].config(relief="sunken", state="disabled")
        
        valor = self.tablero[fila][col]
        
        # Si es una mina, game over
        if valor == -1:
            self.botones[fila][col].config(text="💣", bg="red")
            self.game_over()
            return
        
        # Incrementar contador de casillas descubiertas
        self.casillas_descubiertas += 1
        
        # Mostrar número si es mayor a 0
        if valor > 0:
            color = self.colores_numeros.get(valor, "black")
            self.botones[fila][col].config(text=str(valor), fg=color, bg="#e0e0e0")
        else:
            # Casilla vacía: revelar recursivamente las adyacentes
            self.botones[fila][col].config(bg="#e0e0e0")
            for df in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if df == 0 and dc == 0:
                        continue
                    
                    nf, nc = fila + df, col + dc
                    if 0 <= nf < self.filas and 0 <= nc < self.columnas:
                        if not self.reveladas[nf][nc] and not self.banderas[nf][nc]:
                            self.revelar_casilla(nf, nc)
    
    def game_over(self):
        self.juego_terminado = True
        self.boton_reinicio.config(text="😵")
        
        # Mostrar todas las minas
        for fila, col in self.minas_posiciones:
            if not self.banderas[fila][col]:
                self.botones[fila][col].config(text="💣", bg="#f0c0c0")
        
        # Mostrar minas con banderas incorrectas
        for fila in range(self.filas):
            for col in range(self.columnas):
                if self.banderas[fila][col] and self.tablero[fila][col] != -1:
                    self.botones[fila][col].config(text="❌", bg="#f0c0c0")
        
        messagebox.showinfo("Game Over", "¡Has pisado una mina!\nPresiona F2 para un nuevo juego.")
    
    def verificar_victoria(self):
        # Verificar si todas las casillas no minadas están descubiertas
        if self.casillas_descubiertas == (self.filas * self.columnas - self.minas):
            self.juego_terminado = True
            self.boton_reinicio.config(text="😎")
            
            # Colocar banderas en todas las minas restantes
            minas_restantes = 0
            for fila, col in self.minas_posiciones:
                if not self.banderas[fila][col]:
                    self.banderas[fila][col] = True
                    self.botones[fila][col].config(text="🚩", fg="red", relief="sunken")
                    minas_restantes += 1
            
            self.actualizar_contador_minas()
            messagebox.showinfo("¡Victoria!", f"¡Felicidades! Has ganado.\nTiempo: {self.tiempo_transcurrido} segundos\nPresiona F2 para un nuevo juego.")
    
    def actualizar_contador_minas(self):
        # Contar banderas colocadas
        banderas_colocadas = sum(sum(fila) for fila in self.banderas)
        minas_restantes = self.minas - banderas_colocadas
        self.contador_minas.config(text=str(minas_restantes).zfill(3))
    
    def iniciar_temporizador(self):
        if hasattr(self, 'temporizador_id'):
            self.root.after_cancel(self.temporizador_id)
        self.actualizar_temporizador()
    
    def actualizar_temporizador(self):
        if not self.juego_terminado and not self.primer_click:
            self.tiempo_transcurrido += 1
            self.contador_tiempo.config(text=str(self.tiempo_transcurrido).zfill(3))
        
        # Programar próxima actualización
        self.temporizador_id = self.root.after(1000, self.actualizar_temporizador)
    
    def nuevo_juego(self):
        # Cancelar temporizador anterior
        if hasattr(self, 'temporizador_id'):
            self.root.after_cancel(self.temporizador_id)
        
        # Reinicializar juego
        self.inicializar_juego()
    
    def cambiar_dificultad(self, filas, columnas, minas):
        # Actualizar configuración
        self.filas = filas
        self.columnas = columnas
        self.minas = minas
        
        # Destruir tablero actual
        self.frame_tablero.destroy()
        
        # Crear nuevo tablero
        self.crear_tablero()
        
        # Reiniciar juego
        self.inicializar_juego()

# Función principal
def main():
    root = tk.Tk()
    
    # Centrar ventana en la pantalla
    ancho_ventana = 450
    alto_ventana = 550
    ancho_pantalla = root.winfo_screenwidth()
    alto_pantalla = root.winfo_screenheight()
    x = (ancho_pantalla // 2) - (ancho_ventana // 2)
    y = (alto_pantalla // 2) - (alto_ventana // 2)
    root.geometry(f"{ancho_ventana}x{alto_ventana}+{x}+{y}")
    
    # Crear juego
    juego = Buscaminas(root)
    
    # Ejecutar aplicación
    root.mainloop()

if __name__ == "__main__":
    main()