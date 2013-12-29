CREATE TABLE IF NOT EXISTS tracking ( 
    id         INTEGER      PRIMARY KEY AUTOINCREMENT
                            NOT NULL ON CONFLICT ROLLBACK
                            UNIQUE ON CONFLICT ROLLBACK,
    ip_address TEXT( 15 )   NOT NULL ON CONFLICT ROLLBACK,
    browser    TEXT( 255 )  DEFAULT ( 'unspecified' ),
    [query]    TEXT( 50 )   NOT NULL ON CONFLICT ROLLBACK 
);
