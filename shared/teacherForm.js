// Shared teacher form logic for web and mobile
export function getInitialTeacherForm(teacher) {
  return teacher
    ? {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        subjects: Array.isArray(teacher.subjects)
          ? teacher.subjects.join(', ')
          : teacher.subjects || '',
      }
    : {
        firstName: '',
        lastName: '',
        email: '',
        subjects: '',
      };
}

export function parseSubjects(subjectsString) {
  return subjectsString
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function validateTeacherForm(formData) {
  if (!formData.firstName || !formData.lastName || !formData.email) {
    return 'All fields are required.';
  }
  if (parseSubjects(formData.subjects).length === 0) {
    return 'Please enter at least one subject.';
  }
  // Add more validation as needed
  return null;
}
