import React from 'react';

function Section({ title, children }) {
  return (
    <section
      style={{
        backgroundColor: '#121212',
        padding: '24px 24px 40px',
      }}
    >
      <h2 style={{ color: '#fff', margin: '0 0 20px', fontSize: '24px' }}>{title}</h2>
      {children}
    </section>
  );
}

export default Section;
