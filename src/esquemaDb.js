const TablasConTablasIntermedias = ['Factura', 'Usuario', 'Platillo','Inventario' ]

const esquema = {
    Factura: ['DetalleFactura', 'Platillo'],
    Inventario: ['InventarioHistorico'],
    Permiso: [''],
    Platillo: ['Platillo_Ingrediente'],
    Unidad: [''],
    Usuario: ['Usuario_Permiso'],
    InventarioHistorico: ['']
}


module.exports = {
    TablasConTablasIntermedias,
    esquema
}