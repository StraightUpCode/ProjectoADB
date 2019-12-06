create view vFactura 
as
Select U.nombre + ' ' + U.apellido as nombre , nombreCliente, precioTotal, totalDescontado
From Factura as F
inner join Usuario as U on U.IdUsuario = F.idUsuario
go

create view vDetalleFactura
as
Select P.nombre as platillo, DF.cantidad , P.precio, P.precio *  DF.cantidad  as subtotal , DF.valorDescontado
from DetalleFactura as DF
inner join Platillo as P on P.idPlatillo = DF.idPlatillo
go

create view vPlatillo 
as 
Select *  from Platillo
go
create view vUsuario
as 
Select * from Usuario
go
create view vUsuarioPermiso
as
Select UP.idUsuario , P.tabla, P.crud
from Usuario_Permiso as UP
inner join Permiso as P on P.IdPermiso = UP.idPermiso
go
create view vPermiso 
as
Select *
from Permiso
go
create view vPlatillo_Ingrediente
as
Select P_I.IdPlatilloIngrediente, I.ingrediente, P_I.cantidad, U.unidad, P_I.idPlatillo
from Platillo_Ingrediente as P_I
inner join Inventario as I  on I.IdInventario = P_I.idInventario
inner join Unidad as U on U.IdUnidad = P_I.idUnidad
go
create view vUnidad
as
select * from Unidad
go
create view vInventario 
as
Select I.ingrediente, I.cantidad,  U.unidad 
from Inventario as I 
inner join Unidad as U on U.IdUnidad = I.idUnidad
go