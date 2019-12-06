-- Unidades de Masa
insert into Unidad values ('Lb')
insert into Unidad values ('gr')
insert into Unidad values ('Kg')
-- Unidades de Liquido
insert into Unidad values ('ml')
insert into Unidad values ('L')
-- Unidades Volumetricas
insert into Unidad values ('tsp')
insert into Unidad values ('Tbsp')
insert into Unidad values ('Taza')
--Factura


--Usuario
insert into Usuario 
values
('alex','SaladoPescado10', 'Alex','Cuadra'),
('rodolfo','SaladoPescado10', 'Rodolfo','Andrino'),
('jacobo','SaladoPescado10', 'Jacobo','Amador'),
('roberto','SaladoPescado10', 'Roberto','Sanchez')

--Permiso
insert into Permiso values('Unidad',1),
('Unidad',2),
('Unidad',3),
('Unidad',4),
('Unidad',5),
('Unidad',6),
('Unidad',7),
('Unidad',8),
('Unidad',9),
('Unidad',10),
('Unidad',11),
('Unidad',12),
('Unidad',13),
('Unidad',14),
('Usuario',15),
--
('Usuario_Permiso',1),
('Usuario_Permiso',2),
('Usuario_Permiso',3),
('Usuario_Permiso',4),
('Usuario_Permiso',5),
('Usuario_Permiso',6),
('Usuario_Permiso',7),
('Usuario_Permiso',8),
('Usuario_Permiso',9),
('Usuario_Permiso',10),
('Usuario_Permiso',11),
('Usuario_Permiso',12),
('Usuario_Permiso',13),
('Usuario_Permiso',14),
('Usuario_Permiso',15),
--
('Inventario',1),
('Inventario',2),
('Inventario',3),
('Inventario',4),
('Inventario',5),
('Inventario',6),
('Inventario',7),
('Inventario',8),
('Inventario',9),
('Inventario',10),
('Inventario',11),
('Inventario',12),
('Inventario',13),
('Inventario',14),
('Inventario',15),
--
('Platillo',1),
('Platillo',2),
('Platillo',3),
('Platillo',4),
('Platillo',5),
('Platillo',6),
('Platillo',7),
('Platillo',8),
('Platillo',9),
('Platillo',10),
('Platillo',11),
('Platillo',12),
('Platillo',13),
('Platillo',14),
('Platillo',15),
--
('Platillo_Ingrediente',1),
('Platillo_Ingrediente',2),
('Platillo_Ingrediente',3),
('Platillo_Ingrediente',4),
('Platillo_Ingrediente',5),
('Platillo_Ingrediente',6),
('Platillo_Ingrediente',7),
('Platillo_Ingrediente',8),
('Platillo_Ingrediente',9),
('Platillo_Ingrediente',10),
('Platillo_Ingrediente',11),
('Platillo_Ingrediente',12),
('Platillo_Ingrediente',13),
('Platillo_Ingrediente',14),
('Platillo_Ingrediente',15),
--
('Factura',1),
('Factura',2),
('Factura',3),
('Factura',4),
('Factura',5),
('Factura',6),
('Factura',7),
('Factura',8),
('Factura',9),
('Factura',10),
('Factura',11),
('Factura',12),
('Factura',13),
('Factura',14),
('Factura',15),
--
('DetalleFactura',1),
('DetalleFactura',2),
('DetalleFactura',3),
('DetalleFactura',4),
('DetalleFactura',5),
('DetalleFactura',6),
('DetalleFactura',7),
('DetalleFactura',8),
('DetalleFactura',9),
('DetalleFactura',10),
('DetalleFactura',11),
('DetalleFactura',12),
('DetalleFactura',13),
('DetalleFactura',14),
('DetalleFactura',15)
go


-- Usuario_Permiso
Select * from Usuario_Permiso
--Inventario
insert into Inventario values('Tomate',1,2)

--Platillo
insert into Platillo values('Pizza',25,0)

-- Platilo_Ingrediente
INSERT into Platillo_Ingrediente values(1,1,2,25)


--Factura
Insert into Factura
VALUES
(1,'roberto',123,0,'2019-11-07',1),
(1,'alex',500,0,'2019-11-07',1),
(2,'rodolfo',420,0,'2019-11-11',0),
(2,'jacobo',333,0,'2019-1-30',0),
(3,'josue',75,0,'2019-11-15',1),
(4,'carlos',100,0,'2019-11-08',0),
(3,'marco',120,0,'2019-11-06',1)



