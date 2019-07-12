import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const ProjectContainer = styled.div`
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
  border-radius: 3px;
`;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  const getProjectList = () => {
    axios
    .get('http://localhost:5000/api/projects')
    .then(res => setProjects(res.data))
    .catch(err => setError(err.response.data));
  };
  
  useEffect(() => getProjectList(), []);

  return (
    <div>
      <h1>Project List</h1>
      {error && <p>{error}</p>}
      {projects.map(project => (
        <ProjectContainer key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <Link to={`${project.id}/details`}>View Project Details</Link>
        </ProjectContainer>
      ))}
    </div>
  );
};

export default ProjectList;
