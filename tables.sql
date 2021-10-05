CREATE TABLE FRAMS (
    ID NUMBER,
    ADDRESS VARCHAR(20),
    EXENSION NUMBER,
    CATEGORY_ID NUMBER,
    NAME VARCHAR(400),
    PRIMARY KEY(ID)
);
CREATE SEQUENCE FRAMS_SEQ START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER FRAM_TRG
    BEFORE INSERT ON FRAMS FOR EACH ROW
    WHEN (NEW.ID IS NULL)
BEGIN
    SELECT FRAMS_SEQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;

CREATE TABLE CLIENT (
    ID NUMBER,
    NAME VARCHAR(400),
    EMAIL VARCHAR(400),
    AGE NUMBER,
    PRIMARY KEY(ID)
);
CREATE SEQUENCE CLIENT_SEQ START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CLIENT_TRG
    BEFORE INSERT ON CLIENT FOR EACH ROW
    WHEN (NEW.ID IS NULL)
BEGIN
    SELECT CLIENT_SEQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;

CREATE TABLE MESSAGE (
    ID NUMBER,
    MESSAGETEXT VARCHAR(4000),
    PRIMARY KEY(ID)
);
CREATE SEQUENCE MESSAGE_SEQ START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER MESSAGE_TRG
    BEFORE INSERT ON MESSAGE FOR EACH ROW
    WHEN (NEW.ID IS NULL)
BEGIN
    SELECT MESSAGE_SEQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;