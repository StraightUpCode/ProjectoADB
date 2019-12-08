const TablasConTablasIntermedias = ['Factura', 'Usuario', 'Platillo', ]

const esquema = {
    Factura: ['DetalleFactura', 'Platillo'],
    Inventario: [''],
    Permiso: [''],
    Platillo: ['Platillo_Ingrediente'],
    Unidad: [''],
    Usuario: ['Usuario_Permiso'],
}


module.exports = {
    TablasConTablasIntermedias,
    esquema
}