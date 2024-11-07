import React, { useState, useEffect } from 'react';

const Teste = () => {
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBirthday(selectedDate);
  };

  // Função para verificar se a idade é maior ou igual a 18 anos
  const isValidAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age - 1;
    }
    return age;
  };

  useEffect(() => {
    if (birthday) {
      const parsedDate = new Date(birthday);
      if (isNaN(parsedDate)) {
        setError('Data inválida.');
      } else {
        // Converte para o formato YYYY-MM-DD
        const formatted = parsedDate.toISOString().split('T')[0];
        setFormattedDate(formatted);

        // Verifica se a idade é maior ou igual a 18 anos
        if (isValidAge(birthday) < 18) {
          setError('Você precisa ter pelo menos 18 anos.');
        } else {
          setError('');
        }
      }
    }
  }, [birthday]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && birthday) {
      console.log('Data enviada:', formattedDate); // Aqui você enviaria a data formatada para a API
    } else {
      console.log('Erro na data:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={birthday}
          onChange={handleDateChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default Teste;
