# Sistema de biblioteca
# clase Base(ppal) Material con los atributos (titulo, año, disponibilidad)
# clase derivadas Libro y Revista con atributos especificos
# Implementer un método para prestar y devolver material
# Usar polimorfismo para mostrar la información del material
# Gestionar una coleccion de materiales

from datetime import datetime, timedelta

# Definir la clase principal 
class Material:
    # Constructor
    """Constructor de Material
    param titulo: titulo del material
    param anio: año de publicación
    """
    def __init__(self, titulo, anho):
        self.titulo = titulo
        self.anho = anho
        self.disponible = True
        self.fecha_prestamo = None
        self.usuario_prestamo = None

    def prestar(self, usuario):
        """Prestar el material a un usuario
        param usuario: Nombre usuario
        param return si esta disponible y False si esta prestado
        """
        if not self.disponible:
            print(f"{self.titulo} No está disponible")
            print(f"Prestado a: {self.usuario_prestamo}")
            return False
        self.disponible = False
        self.usuario_prestamo = usuario
        self.fecha_prestamo = datetime.now()
        print(f"'{self.titulo}' prestado a {usuario}")
        return True

    def devolver(self):
        #Devolver el material
        if self.disponible:
            print(f"'{self.titulo}' ya está disponible")
            return False
        dias_prestamo = (datetime.now() - self.fecha_prestamo).days
        print(f"'{self.titulo}' devuelto")
        print(f"Prestado durante {dias_prestamo} dia(s)")
    
    def mostrar_info(self):
        # Información del material
        estado = "Disponible" if self.disponible else "Prestado"
        return f"{self.titulo}({self.anho}) - {estado}"
    
# Libro es una clase hija de Material ( hereda de Material)
class Libro(Material):
    """
    Constructor de la clase Libro 
    param titulo
    param anho
    paran autor
    param isbn
    param num_paginas

    """    
    def __init__(self, titulo, anho, autor, isbn, num_paginas):
        super().__init__(titulo,anho)
        self.autor = autor
        self.isbn = isbn
        self.num_paginas = num_paginas

    def mostrar_info(self):
        #Sobreescribe el metodo para mostrar info específica del libro
        info_base = super().mostrar_info()
        return (f"Libro: {info_base}\n"
                f"Autor: {self.autor}\n"
                f"ISBN: {self.isbn}\n"
                f"Número de páginas: {self.num_paginas}\n"
                )
    
class Revista(Material):
    def __init__(self, titulo, anho, editorial, numero, mes):
        super().__init__(titulo,anho)
        self.editorial = editorial
        self.numero = numero
        self.mes = mes

    def mostrar_info(self):
        #Sobreescribe el metodo para mostrar info específica del libro
        info_base = super().mostrar_info()
        return (f"Revista: {info_base}\n"
                f"Editorial: {self.editorial}\n"
                f"Número: {self.numero}\n"
                f"Mes: {self.mes}\n"
                )
    
"""Gestiona la coleccion de materiales"""
class Biblioteca:
    # Constructor de Biblioteca
    # param nombre: Nombre de la biblioteca
    def __init__(self, nombre):
        self.nombre= nombre
        self.materiales = []
    
    def agregar_material(self, material):
        self.materiales.append(material)
        print (f"Material agregado: {material.titulo}")
    
    def buscar_por_titulo(self, titulo):
        #Comprension de lista con búsqueda case-insensitive
        resultados = [m for m in self.materiales
                      if titulo.lower() in m.titulo.lower()]
        return resultados
    
    def listar_disponibles(self):
        #Lista todos los materiales disponibles
        disponibles= [m for m in self.materiales if m.disponible]

        if not disponibles:
            print("No hay materiales disponibles")
            return
        
        print (f"\n{'='*50}")
        print(f"MATERIALES DISPONIBLES EN {self.nombre.upper()}")
        print (f"\n{'='*50}")
        for material in disponibles:
            print(material.mostrar_info())
            print("-"*50)

    def listar_prestados(self):
        """Listar todos los materiales prestados"""
        prestados= [m for m in self.materiales if not m.disponible]

        if not prestados:
            print("No hay materiales prestados")
            return
        print (f"\n{'='*50}")
        print(f"MATERIALES PRESTADOS EN {self.nombre.upper()}")
        print (f"\n{'='*50}")
        for material in prestados:
            print(material.mostrar_info())
            print(f"    Usuario: {material.usuario_prestamo}")
            dias= (datetime.now() - material.fecha_prestamo).days
            print(f"    Días prestado: {dias}")
            print("-"*50)

    def generar_estadísticas(self):
        #Genera estadísticas de la biblioteca
        total= len(self.materiales)
        disponibles = len([m for m in self.materiales if m.disponible])
        prestados = total - disponibles

        # Contamos por tipo usando isinstance()
        libros = len([m for m in self.materiales if isinstance(m, Libro)])
        revistas = len([m for m in self.materiales if isinstance(m, Revista)])

        print(f"\n{'='*50}")
        print(f"ESTADISTICAS - {self.nombre}")
        print(f"{"="*50}")
        print(f"Total de materiales: {total}")
        print(f"    Libros: {libros}")
        print(f"    Revistas: {revistas}")
        print(f"\nEstado:")
        print(f"  ✔ Disponibles: {disponibles} ({disponibles/total*100:.1f}%)")
        print(f"  ✖ Prestados: {prestados} ({prestados/total*100:.1f}%)")

# ===== PROGRAMA PRINCIPAL =====
def main():
    # Creamos la biblioteca
    biblioteca = Biblioteca("Biblioteca Municipal")
    
    # Agregamos algunos materiales
    libro1 = Libro("Python para Todos", 2008, "Raúl González", 
                   "978-1234567890", 156)
    libro2 = Libro("Clean Code", 2008, "Robert C. Martin", 
                   "978-0132350884", 464)
    libro3 = Libro("El Principito", 1943, "Antoine de Saint-Exupéry",
                   "978-0156012195", 96)
    
    revista1 = Revista("National Geographic", 2024, "NG Partners", 
                       245, "Enero")
    revista2 = Revista("Muy Interesante", 2024, "Zinet Media", 
                       512, "Febrero")
    
    # Agregamos materiales a la biblioteca
    for material in [libro1, libro2, libro3, revista1, revista2]:
        biblioteca.agregar_material(material)
    
    print("\n" + "="*50)
    print("SIMULACIÓN DEL SISTEMA DE BIBLIOTECA")
    print("="*50)
    
    # Listamos materiales disponibles
    biblioteca.listar_disponibles()
    
    # Realizamos algunos préstamos
    print("\n--- REALIZANDO PRÉSTAMOS ---")
    libro1.prestar("Juan Pérez")
    revista1.prestar("María García")
    libro1.prestar("Pedro López")  # Este debería fallar
    
    # Listamos materiales prestados
    biblioteca.listar_prestados()
    
    # Buscamos materiales
    print("\n--- BÚSQUEDA DE MATERIALES ---")
    resultados = biblioteca.buscar_por_titulo("python")
    print(f"Resultados para 'python': {len(resultados)} encontrado(s)")
    for material in resultados:
        print(material.mostrar_info())
    
    # Devolvemos un material
    print("\n--- DEVOLUCIÓN DE MATERIALES ---")
    libro1.devolver()
    
    # Generamos estadísticas
    biblioteca.generar_estadisticas()
    
    # Listamos disponibles de nuevo
    biblioteca.listar_disponibles()


if __name__ == "__main__":
    main()

