/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     02/03/2024 2:48:22 pm                        */
/*==============================================================*/


drop index CLIENTS_PK;

drop table CLIENTS;

drop index BELONGS_FK;

drop index PUBLISH_FK;

drop index EVENTS_PK;

drop table EVENTS;

drop index EVENT_CATEGORIES_PK;

drop table EVENT_CATEGORIES;

drop index HAVE_FK;

drop index BUY_FK;

drop index INVOICES_PK;

drop table INVOICES;

drop index USERS_PK;

drop table USERS;

/*==============================================================*/
/* Table: CLIENTS                                               */
/*==============================================================*/
create table CLIENTS (
   client_id            CHAR(10)             not null,
   client_name          VARCHAR(30)          not null,
   client_phone_number  VARCHAR(10)          not null,
   client_email         VARCHAR(50)          not null
      constraint CKC_CLIENT_EMAIL_CLIENTS check (client_email = lower(client_email)),
   constraint PK_CLIENTS primary key (client_id)
);

/*==============================================================*/
/* Index: CLIENTS_PK                                            */
/*==============================================================*/
create unique index CLIENTS_PK on CLIENTS (
client_id
);

/*==============================================================*/
/* Table: EVENTS                                                */
/*==============================================================*/
create table EVENTS (
   event_id             SERIAL not null,
   user_id              VARCHAR(28)          not null,
   event_category       VARCHAR(30)          not null
      constraint CKC_EVENT_CATEGORY_EVENTS check (event_category = lower(event_category)),
   event_title          VARCHAR(40)          not null,
   event_description    VARCHAR(180)         not null
      constraint CKC_EVENT_DESCRIPTION_EVENTS check (event_description = lower(event_description)),
   event_date           DATE                 not null,
   event_has_poster     BOOL                 not null,
   event_address        VARCHAR(45)          not null
      constraint CKC_EVENT_ADDRESS_EVENTS check (event_address = lower(event_address)),
   event_is_active      BOOL                 not null default true,
   event_ticket_price   NUMERIC(3,2)         not null
      constraint CKC_EVENT_TICKET_PRIC_EVENTS check (event_ticket_price >= 0),
   event_tickets        INT4                 not null
      constraint CKC_EVENT_TICKETS_EVENTS check (event_tickets >= 0),
   constraint PK_EVENTS primary key (event_id)
);

/*==============================================================*/
/* Index: EVENTS_PK                                             */
/*==============================================================*/
create unique index EVENTS_PK on EVENTS (
event_id
);

/*==============================================================*/
/* Index: PUBLISH_FK                                            */
/*==============================================================*/
create  index PUBLISH_FK on EVENTS (
user_id
);

/*==============================================================*/
/* Index: BELONGS_FK                                            */
/*==============================================================*/
create  index BELONGS_FK on EVENTS (
event_category
);

/*==============================================================*/
/* Table: EVENT_CATEGORIES                                      */
/*==============================================================*/
create table EVENT_CATEGORIES (
   event_category       VARCHAR(30)          not null
      constraint CKC_EVENT_CATEGORY_EVENT_CA check (event_category = lower(event_category)),
   constraint PK_EVENT_CATEGORIES primary key (event_category)
);

/*==============================================================*/
/* Index: EVENT_CATEGORIES_PK                                   */
/*==============================================================*/
create unique index EVENT_CATEGORIES_PK on EVENT_CATEGORIES (
event_category
);

/*==============================================================*/
/* Table: INVOICES                                              */
/*==============================================================*/
create table INVOICES (
   invoice_id           SERIAL not null,
   event_id             INT4                 not null,
   client_id            CHAR(10)             not null,
   invoice_date         DATE                 not null,
   invoice_ticket_price NUMERIC(3,2)         not null,
   invoice_tickets      INT4                 not null,
   constraint PK_INVOICES primary key (invoice_id)
);

/*==============================================================*/
/* Index: INVOICES_PK                                           */
/*==============================================================*/
create unique index INVOICES_PK on INVOICES (
invoice_id
);

/*==============================================================*/
/* Index: BUY_FK                                                */
/*==============================================================*/
create  index BUY_FK on INVOICES (
event_id
);

/*==============================================================*/
/* Index: HAVE_FK                                               */
/*==============================================================*/
create  index HAVE_FK on INVOICES (
client_id
);

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS (
   user_id              VARCHAR(28)          not null,
   user_email           VARCHAR(50)          not null
      constraint CKC_USER_EMAIL_USERS check (user_email = lower(user_email)),
   constraint PK_USERS primary key (user_id)
);

/*==============================================================*/
/* Index: USERS_PK                                              */
/*==============================================================*/
create unique index USERS_PK on USERS (
user_id
);

alter table EVENTS
   add constraint FK_EVENTS_BELONGS_EVENT_CA foreign key (event_category)
      references EVENT_CATEGORIES (event_category)
      on delete restrict on update restrict;

alter table EVENTS
   add constraint FK_EVENTS_PUBLISH_USERS foreign key (user_id)
      references USERS (user_id)
      on delete restrict on update restrict;

alter table INVOICES
   add constraint FK_INVOICES_BUY_EVENTS foreign key (event_id)
      references EVENTS (event_id)
      on delete restrict on update restrict;

alter table INVOICES
   add constraint FK_INVOICES_HAVE_CLIENTS foreign key (client_id)
      references CLIENTS (client_id)
      on delete restrict on update restrict;

