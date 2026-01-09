#sistema de biblioteca
#clase base (principal) Material con los atributos ( titulo, año, disponible)
#clases derivadas Libro y Revista con atributos especificos
#Implementar un método para prestar y devolver materiales
#usar polimorfismo para mostrar informacion de cada material
#gestionar un coleccion de materiales

from datetime import datetime, timedelta 
#clase principal
class Material:
    def __init__(self, titulo, anio):
    # """
    # constructor de Material
    # param titulo: Titulo del material
    # param anio: año de publicacion
    # """
        self.titulo = titulo
        self.anio = anio
        self.disponible= True
        self.fecha_prestamo=None
        self.usuario_prestamo=None

    def prestar(self, usuario):
        # Prestar el material a un usuario
        # parm usuario: Nombre usuario
        # param retun si esta disponible y False prestado
        if not self.disponible:
            print(f"'{self.titulo}' no está disponible" ) 
            print(f"Prestado a: {self.usuario_prestamo}")
            return False
        self.disponible = False
        self.usuario_prestamo = usuario
        self.fecha_prestamo = datetime.now()
        print(f"'{self.titulo}'prestado a {usuario}") 
        return True

    def devolver(self):
        # devolver el material
        if self.disponible:
            print(f"'{self.titulo}' ya esta disponible")
            return False
        dias_prestamo = (datetime.now() - self.fecha_prestamo).days
        print(f"'{self.titulo}' devuelto")
        print(f" Prestado durante {dias_prestamo} dia(s)")

    def mostrar_info(self):
        # Informacion del material
        estado = " Disponible" if self.disponible else "Prestado"
        return f"{self.titulo}({self.anio})-{estado}"

class Libro(Material):
    #clase que hereda de material
    def __init__(self, titulo, anio,autor, isbn,num_paginas ):
        # Contructor del Libro
        # parm titulo
        # parm anio
        # parm autor
        # parm isbn
        # parm num_paginas
        #llamar a la clase superior
        super().__init__(titulo, anio)
        self.autor = autor
        self.isbn = isbn
        self.num_paginas= num_paginas
    
    def mostrar_info(self):
        #sobre escribe el metodo para mostrar info especifica del libro
        
        info_base = super().mostrar_info()
        return(f"Libro:{info_base}\n"
               f" Autor: {self.autor}\n"
               f" ISBN : {self.isbn}\n"
               f" Páginas : {self.num_paginas}"             
               )
     

class Revista(Material):
    def __init__(self, titulo, anio, editorial, numero, mes):
        super().__init__(titulo, anio)
        self.editorial  = editorial
        self.numero = numero
        self.mes = mes
    def mostrar_info(self):
        info_base = super().mostrar_info()
        return(f"Revista:{info_base}\n"
               f" Editorial: {self.editorial}\n"
               f" Número : {self.numero}\n"
               f" Mes : {self.mes}"             
               )

class Biblioteca:
    """Gestiona la colección de materiales"""
    def __init__(self, nombre):
        """
        Constructor de Biblioteca
        :param nombre: Nombre de la biblioteca
        """
        self.nombre = nombre
        self.materiales = []
    
    def agregar_material(self, material):
        """
        Agrega un material a la biblioteca
        :param material: Instancia de Material o sus subclases
        """
        self.materiales.append(material)
        print(f"Material agregado: {material.titulo}")
    
    def buscar_por_titulo(self, titulo):
        """
        Busca materiales por título (búsqueda parcial)
        :param titulo: Texto a buscar en el título
        :return: Lista de materiales encontrados
        """
        # Comprensión de lista con búsqueda case-insensitive
        resultados = [m for m in self.materiales 
                     if titulo.lower() in m.titulo.lower()]
        return resultados
    
    def listar_disponibles(self):
        """Lista todos los materiales disponibles"""
        disponibles = [m for m in self.materiales if m.disponible]
        
        if not disponibles:
            print("No hay materiales disponibles")
            return
        
        print(f"\n{'='*50}")
        print(f"MATERIALES DISPONIBLES EN {self.nombre}")
        print(f"{'='*50}")
        for material in disponibles:
            print(material.mostrar_info())
            print("-" * 50)


def listar_prestados(self):
        """Lista todos los materiales prestados"""
        prestados = [m for m in self.materiales if not m.disponible]
        
        if not prestados:
            print("No hay materiales prestados")
            return
        
        print(f"\n{'='*50}")
        print(f"MATERIALES PRESTADOS")
        print(f"{'='*50}")
        for material in prestados:
            print(material.mostrar_info())
            print(f"    Usuario: {material.usuario_prestamo}")
            dias = (datetime.now() - material.fecha_prestamo).days
            print(f"    Días prestado: {dias}")
            print("-" * 50)
    
def generar_estadisticas(self):
        """Genera estadísticas de la biblioteca"""
        total = len(self.materiales)
        disponibles = len([m for m in self.materiales if m.disponible])
        prestados = total - disponibles
        


        """isinstance
       Corrige tipos duplicados en el segundo argumento de isinstance(). Por ejemplo,``isinstance(x, (int, int))`` es convertido a isinstance(x, int) y isinstance(x, (int, float, int)) es convertido a isinstance(x, (int, float))."""

        # Contamos por tipo usando isinstance()
        libros = len([m for m in self.materiales if isinstance(m, Libro)])
        revistas = len([m for m in self.materiales if isinstance(m, Revista)])
        
        print(f"\n{'='*50}")
        print(f"ESTADÍSTICAS - {self.nombre}")
        print(f"{'='*50}")
        print(f"Total de materiales: {total}")
        print(f"   Libros: {libros}")
        print(f"   Revistas: {revistas}")
        print(f"\nEstado:")
        print(f"  ✓ Disponibles: {disponibles} ({disponibles/total*100:.1f}%)")
        print(f"  ✗ Prestados: {prestados} ({prestados/total*100:.1f}%)")



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