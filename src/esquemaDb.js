const TablasConTablasIntermedias = ['Factura', 'Usuario', 'Platillo', 'Factura']

const esquema = {
    Factura: 'DetalleFactura',
    Platilo: 'Platilo_Ingrediente',
    Usuario: 'UsarioPermiso'
}


module.exports = {
    TablasConTablasIntermedias,
    esquema
}