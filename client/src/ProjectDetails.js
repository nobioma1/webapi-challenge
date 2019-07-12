import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectDetails = props => {
  const id = props.match.params.id;
  const [projectDetail, setProjectDetail] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const getProjectDetail = () => {
      axios
        .get(`http://localhost:5000/api/projects/${id}`)
        .then(res => setProjectDetail(res.data))
        .catch(err => setError(err.response.data));
    };
    getProjectDetail();
  }, [id]);

  return (
    <div>
      <h2>Project Detail</h2>
      <Link to="/">← Back to Projects</Link>
      {error && <p>{error}</p>}
      <h4>Name: {projectDetail.name}</h4>
      <p>Description: {projectDetail.description}</p>
      <p>
        Status:{' '}
        {projectDetail.isCompleted
          ? 'Project is Completed'
          : 'Project is not completed'}
      </p>
      <ul>
        Actions:
        {projectDetail.hasOwnProperty('actions') &&
        projectDetail.actions.length > 0 ? (
          projectDetail.actions.map(action => (
            <li key={action.id}>
              <div>
                <p>{action.description}</p>
                <p>{action.notes}</p>
              </div>
            </li>
          ))
        ) : (
          <p>Project Has No Actions</p>
        )}
      </ul>
    </div>
  );
};

export default ProjectDetails;
