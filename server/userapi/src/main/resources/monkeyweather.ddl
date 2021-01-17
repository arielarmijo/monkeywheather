drop table rel_users_locations;
drop table users;
drop table locations;


create table users (
    user_name varchar2(100),
    password    varchar2(128) not null,
    avatar blob
);

alter table users add constraint users_pk primary key (user_name);

create table locations (
    city varchar2(100)
);

alter table locations add constraint locations_pk primary key (city);

create table rel_users_locations (
    user_fk varchar2(100),
    location_fk varchar2(100)
);

alter table rel_users_locations add constraint rel_users_locations_pk primary key (user_fk, location_fk);
alter table rel_users_locations add constraint rel_users_locations_user_fk foreign key (user_fk) references users (user_name);
alter table rel_users_locations add constraint rel_users_locations_loc_fk foreign key (location_fk) references locations (city);

insert into users (user_name, password) values ('admin', 'admin');
insert into locations values ('Santiago');
insert into locations values ('Valparaíso');
insert into locations values ('Concepción');
insert into rel_users_locations values ('admin', 'Santiago');
insert into rel_users_locations values ('admin', 'Valparaíso');
insert into rel_users_locations values ('admin', 'Concepción');

commit;

select * from locations;