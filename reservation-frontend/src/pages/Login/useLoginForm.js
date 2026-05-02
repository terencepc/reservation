import { useState } from 'react';
import { loginAdmin } from '../../services/authService';

const initialForm = {
  username: '',
  password: ''
};

export function useLoginForm(onLogin) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await loginAdmin(form);
      onLogin(response.token);
    } catch (submitError) {
      setError(submitError.message || 'Unable to login');
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    error,
    isSubmitting,
    submit,
    updateField
  };
}
