import styles from './Project.module.css'
import Loading from '../layout/Loading'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProject] = useState(false)
    const [showServiceForm, setShowService] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch(err => console.log(err))
        }, 150)
    }, [id])

    function editPost(project) {
        setMessage('')

        //budget validation
        if (project.budget < project.cost) {
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProject(false)
                setMessage("Projeto atualizado")
                setType("sucess")
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProject(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowService(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn}
                                onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir Edição"
                                        projectData={project}>
                                    </ProjectForm>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço: </h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {
                                    showServiceForm && (
                                        <div>
                                            Formulário de Serviço
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            <p>Itens de serviço</p>
                        </Container>
                    </Container>
                </div>)
                : (<Loading />)}
        </>
    )
}
export default Project