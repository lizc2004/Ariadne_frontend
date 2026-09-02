import { subjectHue } from '../utils/subjectColor'

function SubjectTag({ materia }) {
  return (
    <span className="tag subject-tag" style={{ '--subject-h': subjectHue(materia) }}>
      {materia}
    </span>
  )
}

export default SubjectTag