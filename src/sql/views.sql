create view vIngredientesPlatillo 
as 
Select P.nombre , I.ingrediente , PI.cantidad, U.unidad
from Platillo_Ingrediente as PI
INNER JOIN Platillo as P on P.IdPlatillo = PI.idPlatillo
INNER JOIN Inventario as I on I.IdInventario = PI.idInventario
INNER JOIN Unidad as U on U.IdUnidad = PI.idUnidad

GO