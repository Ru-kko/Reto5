-- /fram

SELECT * FROM FRAMS -- GET

BEGIN -- PUT
    UPDATE FRAMS SET ADDRESS =:address , EXENSION= :exension, CATEGORY_ID= :category_id, NAME =:name 
    WHERE ID = :id;
    :status_code:= 201;
END;

BEGIN -- POST
    INSERT INTO FRAMS (ID, ADDRESS, EXENSION, CATEGORY_ID, NAME)
    VALUES (:id, :address, :exension, :category_id, :name);
    :status_code := 201;
END;

BEGIN -- DELETE
    DELETE FROM FRAMS WHERE ID = :id;
    :status_code := 204;
END;

-- /client

SELECT * FROM CLIENT -- GET

BEGIN -- POST
    INSERT INTO CLIENT(ID, NAME, EMAIL, AGE) VALUES(:id, :name, :email, :age);
    :status_code := 201;
END;

BEGIN -- PUT
    UPDATE CLIENT SET NAME =:name , EMAIL= :email, AGE= :age 
    WHERE ID = :id;
    :status_code:= 201;
END;

BEGIN -- DELETE
    DELETE FROM CLIENT WHERE ID = :id;
    :status_code := 204;
END;

-- /messages

SELECT * FROM MESSAGE -- GET

BEGIN -- POST
    INSERT INTO MESSAGE (ID,MESSAGETEXT)
    VALUES (:id, :messagetext);
    :status_code := 201;
END;

BEGIN -- PUT
    UPDATE MESSAGE SET MESSAGETEXT = :messagetext
    WHERE ID = :id;
    :status_code:= 201;
END;

BEGIN -- DELETE
    DELETE FROM MESSAGE WHERE ID = :id;
    :status_code := 204;
END;