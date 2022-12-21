import { useEffect, useState } from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ btnText }) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch(err => console.log(err))
    },[])

    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto"></Input>
            <Input
                type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento total">
            </Input>
            <Select name="category_id" text="Selecione a categoria" options={categories}>
            </Select>
            <SubmitButton text={btnText}></SubmitButton>
        </form>
    )
}
export default ProjectForm