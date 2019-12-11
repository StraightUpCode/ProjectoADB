create view vFactura 
as
Select IdFactura ,F.fecha, U.nombre + ' ' + U.apellido as vendedor, nombreCliente, precioTotal, totalDescontado, cancelado
From Factura as F
inner join Usuario as U on U.IdUsuario = F.idUsuario
go
drop view vDetalleFactura
go
create view vDetalleFactura
as
Select F.IdFactura, DF.IdDetalleFactura, DF.idPlatillo , P.nombre as platillo, DF.cantidad , P.precio, DF.subtotal , DF.valorDescontado
from DetalleFactura as DF
inner join Platillo as P on P.idPlatillo = DF.idPlatillo
inner join Factura as F on F.IdFactura = DF.IdFactura
go
Grant select on vDetalleFactura to lmao
go
create view vPlatillo 
as 
Select *  from Platillo
go
create view vUsuario
as 
Select * from Usuario
go
create view vUsuario_Permiso
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
drop view vPlatillo_Ingrediente
create view vPlatillo_Ingrediente
as
Select P_I.IdPlatilloIngrediente, I.IdInventario, U.IdUnidad,I.ingrediente, P_I.cantidad, U.unidad, P_I.idPlatillo
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
Select I.IdInventario,I.ingrediente, I.cantidad,  U.unidad , U.IdUnidad
from Inventario as I 
inner join Unidad as U on U.IdUnidad = I.idUnidad
go

-- Procedimiento
create procedure sp_MiData 
   @username nvarchar(50),
   @password NVARCHAR(64)
as 
    Select IdUsuario, nombreUsuario, nombre, apellido 
    from vUsuario
    where vUsuario.nombreUsuario = @username
    and vUsuario.contrasena = @password
go

Select * from Permiso
go
create procedure sp_MisPermisos
    @IdUsuario INT
as
Select tabla, crud 
from Permiso
inner join Usuario_Permiso on Usuario_Permiso.idPermiso = Permiso.IdPermiso
inner join Usuario on Usuario.IdUsuario = Usuario_Permiso.idUsuario
where Usuario.IdUsuario = @IdUsuario
go

Select * from Factura
Select * from DetalleFactura
Select * from vUsuario where IdUsuario =26
Select * from Usuario_Permiso
