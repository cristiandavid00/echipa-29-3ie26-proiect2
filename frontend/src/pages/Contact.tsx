import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl mt-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contactează-ne</h1>
      <p className="text-lg text-gray-600 mb-8">
        Completează formularul de mai jos și un membru al echipei noastre îți va răspunde în cel mai scurt timp.
      </p>

      {/* Formularul configurat special pentru Netlify */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        className="bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-100"
      >
        {/* Câmp ascuns OBLIGATORIU pentru Netlify Forms în aplicații React */}
        <input type="hidden" name="form-name" value="contact" />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Numele tău
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors" 
            placeholder="Ex: Ion Popescu" 
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Adresa de email
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors" 
            placeholder="ion@exemplu.com" 
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
            Mesajul tău
          </label>
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            required 
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors" 
            placeholder="Scrie mesajul tău aici..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 shadow-md hover:shadow-lg"
        >
          Trimite Mesajul
        </button>
      </form>
    </div>
  );
};

export default Contact;