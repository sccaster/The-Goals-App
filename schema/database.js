const pg = require('pg');

const pool = new pg.Pool({
    database: 'postgres',
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000
});

const getUser = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        if (data.id) {
            results = await client.query(`SELECT * FROM users WHERE id = ${data.id};`);
        }

        client.release();
        return results.rows;

    } catch (e) {
        console.error(e);
    }
}

const getGoal = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        if (data.id) {
            results = await client.query(`SELECT * FROM goals WHERE id = ${data.id};`);
        }

        client.release();
        return results.rows;

    } catch (e) {
        console.error(e);
    }
}

const getTask = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        if (data.id) {
            results = await client.query(`SELECT * FROM tasks WHERE id = ${data.id};`);
        }

        client.release();
        return results.rows;

    } catch (e) {
        console.error(e);
    }
}

const getNotification = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        if (data.id) {
            results = await client.query(`SELECT * FROM notifications WHERE id = ${data.id};`);
        }

        client.release();
        return results.rows;

    } catch (e) {
        console.error(e);
    }
}

const createNotification = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`INSERT INTO notifications (text, timestamp, task_id) VALUES ('${data.input.text}', '${data.input.timestamp}', '${data.input.task_id}') RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const editNotification = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`UPDATE notifications SET text = '${data.input.text}', timestamp = '${data.input.timestamp}' WHERE id = ${data.input.id} RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const deleteNotification = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`DELETE FROM notifications WHERE id = ${data.input.id} RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const createUser = async (data) => {
    try {
        let results;
        const client = await pool.connect();
        
        results = await client.query(`INSERT INTO users (first_name, last_name, email, hashed_password) VALUES ('${data.input.first_name}', '${data.input.last_name}', '${data.input.email}', '${data.input.hashed_password}') RETURNING *;`);
        
        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const editUser = async (data) => {
    try {
        let results;
        const client = await pool.connect();
        
        results = await client.query(`UPDATE users SET first_name = '${data.input.first_name}', last_name = '${data.input.last_name}', email = '${data.input.email}', hashed_password = '${data.input.hashed_password}' WHERE id = ${data.input.id} RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const deleteUser = async (data) => {
    try {
        let results;
        const client = await pool.connect();
        
        results = await client.query(`DELETE FROM users WHERE id = ${data.input.id} RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const createTask = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`INSERT INTO tasks (title, timestamp, locationlat, locationlon, locationrad, notes, goal_id) VALUES ('${data.input.title}', '${data.input.timestamp}', '${data.input.locationlat}', '${data.input.locationlon}', '${data.input.locationrad}', '${data.input.notes}', '${data.input.goal_id}') RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const editTask = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`UPDATE tasks SET title = '${data.input.title}', timestamp = '${data.input.timestamp}', locationlat = '${data.input.locationlat}', locationlon = '${data.input.locationlon}', locationrad = '${data.input.locationrad}', notes = '${data.input.notes}' WHERE id = ${data.input.id} RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const deleteTask = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`DELETE FROM tasks WHERE id = '${data.input.id}' RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const createGoal = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`INSERT INTO goals (text) VALUES ('${data.input.text}') RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const editGoal = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`UPDATE goals SET text = '${data.input.text}' WHERE id = ${data.input.id} RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const deleteGoal = async (data) => {
    try {
        let results;
        const client = await pool.connect();

        results = await client.query(`DELETE FROM goals WHERE id = '${data.input.id}' RETURNING *;`);

        client.release();
        return results.rows[0];

    } catch (e) {
        console.error(e);
    }
}

const setupDatabase = async (data) => {
    await pool.query(`CREATE TABLE users(\
        id SERIAL PRIMARY KEY, \
        quote TEXT, \
        theme TEXT, \
        theme_duration INT, \
        first_name VARCHAR (32) NOT NULL, \
        last_name VARCHAR (32) NOT NULL, \
        email VARCHAR (64) NOT NULL, \
        hashed_password TEXT NOT NULL);`
        );

    await pool.query(`CREATE TABLE goals(\
        id SERIAL PRIMARY KEY, \
        text TEXT NOT NULL);`
        );

    await pool.query(`CREATE TABLE tasks(\
        id SERIAL PRIMARY KEY, \
        title TEXT NOT NULL, \
        timestamp VARCHAR (16), \
        locationLat INT, \
        locationLon INT, \
        locationRad INT, \
        notes TEXT, \
        goal_id INT NOT NULL);`
        );

    await pool.query(`CREATE TABLE notifications(\
        id SERIAL PRIMARY KEY, \
        text VARCHAR (64), \
        timestamp VARCHAR (16), \
        task_id INT NOT NULL);`
        );
}

module.exports = {
    setupDatabase,
    getUser,
    getGoal,
    getTask,
    getNotification,
    createNotification,
    editNotification,
    deleteNotification,
    createUser,
    editUser,
    deleteUser,
    createTask,
    editTask,
    deleteTask,
    createGoal,
    editGoal,
    deleteGoal
}
