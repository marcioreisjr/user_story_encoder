import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    id: "US-001",
    title: "",
    story: {
      as: "",
      iWant: "",
      soThat: ""
    },
    acceptanceCriteria: [""],
    businessValue: "HIGH",
    effort: "SMALL",
    dependencies: [],
    notes: ""
  })

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateStory = (field, value) => {
    setFormData(prev => ({
      ...prev,
      story: { ...prev.story, [field]: value }
    }))
  }

  const updateArrayItem = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${formData.id || "user-story"}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <div className="container">
      <div className="header">
        <h1>User Story Encoder</h1>
        <p>Generate standardized user stories in JSON format.</p>
      </div>

      <div className="card">
        <div className="row">
          <div className="col form-group">
            <label>ID</label>
            <input 
              value={formData.id} 
              onChange={e => updateField('id', e.target.value)} 
              placeholder="e.g., US-001"
            />
          </div>
          <div className="col form-group">
            <label>Title</label>
            <input 
              value={formData.title} 
              onChange={e => updateField('title', e.target.value)} 
              placeholder="e.g., Quick Restaurant Browse"
            />
          </div>
        </div>

        <h3>The Story</h3>
        <div className="form-group">
          <label>As a...</label>
          <input 
            value={formData.story.as} 
            onChange={e => updateStory('as', e.target.value)} 
            placeholder="e.g., hungry student after 10 PM"
          />
        </div>
        <div className="form-group">
          <label>I want to...</label>
          <input 
            value={formData.story.iWant} 
            onChange={e => updateStory('iWant', e.target.value)} 
            placeholder="e.g., see all available restaurants at a glance"
          />
        </div>
        <div className="form-group">
          <label>So that...</label>
          <input 
            value={formData.story.soThat} 
            onChange={e => updateStory('soThat', e.target.value)} 
            placeholder="e.g., I can quickly choose where to order from"
          />
        </div>

        <h3>Acceptance Criteria</h3>
        <div className="form-group">
          {formData.acceptanceCriteria.map((item, index) => (
            <div key={index} className="array-item">
              <input 
                value={item} 
                onChange={e => updateArrayItem('acceptanceCriteria', index, e.target.value)}
                placeholder={`Criterion ${index + 1}`}
              />
              <button className="danger" onClick={() => removeArrayItem('acceptanceCriteria', index)}>×</button>
            </div>
          ))}
          <button className="secondary" onClick={() => addArrayItem('acceptanceCriteria')}>+ Add Criterion</button>
        </div>

        <div className="row">
          <div className="col form-group">
            <label>Business Value</label>
            <select value={formData.businessValue} onChange={e => updateField('businessValue', e.target.value)}>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
          <div className="col form-group">
            <label>Effort</label>
            <select value={formData.effort} onChange={e => updateField('effort', e.target.value)}>
              <option value="SMALL">SMALL</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LARGE">LARGE</option>
              <option value="XLARGE">XLARGE</option>
            </select>
          </div>
        </div>

        <h3>Dependencies</h3>
        <div className="form-group">
          {formData.dependencies.map((item, index) => (
            <div key={index} className="array-item">
              <input 
                value={item} 
                onChange={e => updateArrayItem('dependencies', index, e.target.value)}
                placeholder={`Dependency ${index + 1}`}
              />
              <button className="danger" onClick={() => removeArrayItem('dependencies', index)}>×</button>
            </div>
          ))}
          <button className="secondary" onClick={() => addArrayItem('dependencies')}>+ Add Dependency</button>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea 
            value={formData.notes} 
            onChange={e => updateField('notes', e.target.value)} 
            rows={3}
            placeholder="Any additional context..."
          />
        </div>
      </div>

      <div className="card">
        <h3>JSON Preview</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button onClick={downloadJson}>Download JSON</button>
        </div>
      </div>
    </div>
  )
}

export default App
