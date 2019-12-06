const TablasConTablasIntermedias = ['Factura', 'Usuario', 'Platillo', 'Factura']

const esquema = {
    Factura: 'DetalleFactura',
    Platilo: 'Platilo_Ingrediente',
    Usuario: 'Usuario_Permiso',
    Platillo: 'Platillo_Ingrediente'
}


module.exports = {
    TablasConTablasIntermedias,
    esquema
}