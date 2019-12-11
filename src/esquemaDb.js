const TablasConTablasIntermedias = ['Factura', 'Usuario', 'Platillo','Inventario' ]

const esquema = {
    Factura: ['DetalleFactura', 'Platillo'],
    Inventario: ['InventarioHistorico'],
    Permiso: [''],
    Platillo: ['Platillo_Ingrediente'],
    Unidad: [''],
    Usuario: ['Usuario_Permiso'],
}


module.exports = {
    TablasConTablasIntermedias,
    esquema
}