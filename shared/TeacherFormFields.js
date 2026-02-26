import React, { useState } from 'react';
import { getInitialTeacherForm, parseSubjects, validateTeacherForm } from './teacherForm';

// Platform-specific props: onImagePick (web: file input, mobile: image picker), image, setImage
export default function TeacherFormFields({
  teacher,
  onSubmit,
  onCancel,
  submitting,
  platform, // 'web' or 'mobile'
  image,
  setImage,
  onImagePick, // function for image picking
}) {
  const [formData, setFormData] = useState(getInitialTeacherForm(teacher));
  const [error, setError] = useState(null);

  const handleChange = (eOrName, value) => {
    if (platform === 'web') {
      const e = eOrName;
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [eOrName]: value });
    }
  };

  const handleImageChange = (e) => {
    if (platform === 'web') {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
        onImagePick && onImagePick(file);
      }
    } else {
      onImagePick && onImagePick();
    }
  };

  const handleSubmit = async (e) => {
    if (platform === 'web') e.preventDefault();
    setError(null);
    const validation = validateTeacherForm(formData);
    if (validation) {
      setError(validation);
      return;
    }
    try {
      await onSubmit({
        ...formData,
        subjects: parseSubjects(formData.subjects),
        image,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Layout: avatar upload, side-by-side name fields, email, subjects, buttons
  return (
    <form onSubmit={platform === 'web' ? handleSubmit : undefined} style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 110 }}>
          <div style={{ width: 80, height: 80, borderRadius: 12, background: '#f3f4f6', marginBottom: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {image ? (
              <img src={image} alt="avatar" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 38, color: '#b0b0b0' }}>👤</span>
            )}
          </div>
          {platform === 'web' ? (
            <>
              <label htmlFor="avatar-upload" style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '6px 10px', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginBottom: 2 }}>
                📷 Upload Image
                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} disabled={submitting} />
              </label>
              <span style={{ fontSize: 10, color: '#888', marginBottom: 2, textAlign: 'center' }}>JPG or PNG, up to 2MB</span>
            </>
          ) : (
            <>
              <button type="button" style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '6px 10px', fontWeight: 600, fontSize: 13, marginBottom: 2 }} onClick={handleImageChange} disabled={submitting}>
                📷 Upload Image
              </button>
              <span style={{ fontSize: 10, color: '#888', marginBottom: 2, textAlign: 'center' }}>JPG or PNG, up to 2MB</span>
            </>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <div style={{ flex: 1 }}>
              <label>First Name <span style={{ color: '#a21caf', fontWeight: 'bold' }}>*</span></label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. Mai"
                value={formData.firstName}
                onChange={platform === 'web' ? handleChange : (v) => handleChange('firstName', v)}
                required
                disabled={submitting}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #c7d2fe', marginBottom: 4 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Last Name <span style={{ color: '#a21caf', fontWeight: 'bold' }}>*</span></label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Raz"
                value={formData.lastName}
                onChange={platform === 'web' ? handleChange : (v) => handleChange('lastName', v)}
                required
                disabled={submitting}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #c7d2fe', marginBottom: 4 }}
              />
            </div>
          </div>
          <label>Email <span style={{ color: '#a21caf', fontWeight: 'bold' }}>*</span></label>
          <input
            type="email"
            name="email"
            placeholder="e.g. name@school.org"
            value={formData.email}
            onChange={platform === 'web' ? handleChange : (v) => handleChange('email', v)}
            required
            disabled={submitting}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #c7d2fe', marginBottom: 4 }}
          />
          <label>Subjects <span style={{ color: '#a21caf', fontWeight: 'bold' }}>*</span></label>
          <input
            type="text"
            name="subjects"
            placeholder="english,math, science"
            value={formData.subjects}
            onChange={platform === 'web' ? handleChange : (v) => handleChange('subjects', v)}
            required
            disabled={submitting}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #c7d2fe', marginBottom: 2 }}
          />
          <span style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, marginLeft: 2 }}>Enter subjects separated by commas</span>
        </div>
      </div>
      {error && <div style={{ color: '#dc2626', marginBottom: 10, fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>{error}</div>}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button type="button" onClick={onCancel} disabled={submitting} style={{ background: '#e0e7ef', color: '#222', borderRadius: 8, padding: '10px 22px', fontWeight: 700, border: '1px solid #c7d2fe' }}>Cancel</button>
        <button type={platform === 'web' ? 'submit' : 'button'} onClick={platform === 'web' ? undefined : handleSubmit} disabled={submitting} style={{ background: '#6366f1', color: '#fff', borderRadius: 8, padding: '10px 22px', fontWeight: 700, border: '1px solid #3730a3' }}>{submitting ? (teacher ? 'Updating...' : 'Create Teacher') : (teacher ? 'Update Teacher' : 'Create Teacher')}</button>
      </div>
    </form>
  );
}
