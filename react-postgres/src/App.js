import React, {useState, useEffect} from 'react';
import './App.css'
function App() {
    const [students, setStudents] = useState(false);
    useEffect(() => {
        getStudent();
    }, []);
    function getStudent() {
            fetch('http://localhost:3001')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setStudents(data);
            });

    }
    function createStudent() {
        let name = prompt('Введите имя студента: ');
        let email = prompt('Введите email студента: ');
        fetch('http://localhost:3001/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getStudent();
            });
    }
    function deleteStudent() {
        let id = prompt('Введите id студента, которого хотите удалить');
        fetch(`http://localhost:3001/students/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getStudent();
            });
    }
    return (
        <div>
            {students ? students : 'Данные о студенте отсутствуют'}
            <br />
            <button onClick={createStudent}>Добавить студента в список</button>
            <br />
            <button onClick={deleteStudent}>Удалить студента из списка</button>
        </div>
    );
}
export default App;

