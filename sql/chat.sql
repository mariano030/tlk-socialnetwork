DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT into chat (sender_id, message)
values (1, 'this is my first message, i am luca luca');

INSERT into chat (sender_id, message)
values (2, 'cat online in the house');

INSERT into chat (sender_id, message)
values (3, 'I dont feel like you are my real friends....');

INSERT into chat (sender_id, message)
values (3, 'Are you my real friends?!');

INSERT into chat (sender_id, message)
values (2, 'I am definetly real, but dont expect too much I type slowly');
