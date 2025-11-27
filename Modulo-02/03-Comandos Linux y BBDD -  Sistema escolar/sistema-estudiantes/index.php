<?php
// index.php
include 'conexion.php';
include 'includes/header.php';
?>

<div class="row">
    <div class="col-md-12">
        <h1 class="text-center mb-4">Bienvenido al Sistema de Gestión Estudiantil</h1>
        
        <div class="row">
            <div class="col-md-3 mb-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h5 class="card-title">Estudiantes</h5>
                        <?php
                        $query = "SELECT COUNT(*) as total FROM estudiantes WHERE activo = 1";
                        $result = $conexion->query($query);
                        $row = $result->fetch_assoc();
                        echo "<h2>" . $row['total'] . "</h2>";
                        ?>
                        <a href="estudiantes.php" class="text-white">Ver estudiantes</a>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-4">
                <div class="card text-white bg-success">
                    <div class="card-body">
                        <h5 class="card-title">Asignaturas</h5>
                        <?php
                        $query = "SELECT COUNT(*) as total FROM asignaturas";
                        $result = $conexion->query($query);
                        $row = $result->fetch_assoc();
                        echo "<h2>" . $row['total'] . "</h2>";
                        ?>
                        <a href="asignaturas.php" class="text-white">Ver asignaturas</a>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-4">
                <div class="card text-white bg-warning">
                    <div class="card-body">
                        <h5 class="card-title">Profesores</h5>
                        <?php
                        $query = "SELECT COUNT(*) as total FROM docentes";
                        $result = $conexion->query($query);
                        $row = $result->fetch_assoc();
                        echo "<h2>" . $row['total'] . "</h2>";
                        ?>
                        <a href="#" class="text-white">Ver profesores</a>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-4">
                <div class="card text-white bg-info">
                    <div class="card-body">
                        <h5 class="card-title">Matrículas Activas</h5>
                        <?php
                        $query = "SELECT COUNT(*) as total FROM matriculas WHERE estado = 'CURSANDO'";
                        $result = $conexion->query($query);
                        $row = $result->fetch_assoc();
                        echo "<h2>" . $row['total'] . "</h2>";
                        ?>
                        <a href="matriculas.php" class="text-white">Ver matrículas</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
include "includes/footer.php";
?>