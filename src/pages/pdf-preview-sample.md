Quero que o preview seia a seguinte estrutura:

```
"use client";
import { useState } from "react";
import "./pdf.css";

const loadPropertyData = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const savedData = localStorage.getItem("propertyData");
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      console.log("Dados carregados do localStorage:", parsedData);
      localStorage.removeItem("propertyData");
      return parsedData;
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
      return null;
    }
  }
  return null;
};

export default function PDFPage() {
  const savedData = loadPropertyData();

  const [data] = useState({
    brand: {
      name: savedData?.brand?.name || "",
      location: savedData?.brand?.location || "",
      description: savedData?.brand?.description || "",
    },
    property: {
      resume: savedData?.property?.resume || "",
      description: savedData?.property?.description || "",
      reference: savedData?.property?.reference || "",
      mainImage: savedData?.property?.mainImage || "",
      sideImages: savedData?.property?.sideImages || ["", ""],
      gallery: savedData?.property?.gallery || [],
      features: savedData?.property?.features || [],
      infrastructures: savedData?.property?.infrastructures || [],
      area: savedData?.property?.area || "",
      condominium: savedData?.property?.condominium || "",
      parking: savedData?.property?.parking || "",
      iptu: savedData?.property?.iptu || "",
      price: savedData?.property?.price || "",
    },
    agent: {
      name: "Maurício Henrique",
      specialization: "Corretor de Imóveis",
      phone: "(55) 99999-9999",
      email: "mauricio@corretor.com",
    },
  });

  return (
    <>
      <div className="page cover-page">
        <img
          src={data.property.mainImage}
          className="cover-image"
          alt="Fachada"
        />
        <div className="cover-content">
          <div className="tag">Exclusividade</div>
          <h1>
            {data.brand.name} <br />
            {data.brand.location}
          </h1>
          <p>{data.brand.description}</p>
        </div>
      </div>

      <div className="page room-page">
        <div className="room-header">
          <div className="room-title">Apartamento à Venda</div>
          <div className="room-subtitle">{data.property.resume}</div>
        </div>

        <img src={data.property.mainImage} className="room-hero" alt="Imóvel" />

        <div className="room-body">
          <div className="room-desc">
            <h3>Descrição</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: data.property.description,
              }}
            />
          </div>

          <div className="side-gallery">
            {data.property.sideImages.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                className="side-img"
                alt={`Detalhe ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {data.property.gallery.map((image: string, index: number) => (
        <div className="page room-page gallery-page" key={index}>
          <div className="room-header">
            <div className="room-subtitle">
              {data.brand.name} - {data.property.resume}
            </div>
          </div>

          <div className="gallery-content">
            <div className="gallery-figure">
              <img src={image} className="gallery-img" alt="Imagem" />
            </div>
          </div>
        </div>
      ))}

      <div className="page final-page">
        <div>
          <h2
            style={{
              fontSize: "40px",
              borderBottom: "2px solid var(--accent)",
              display: "inline-block",
              paddingBottom: "10px",
              marginBottom: "30px",
            }}
          >
            Resumo
          </h2>

          <div className="room-desc flex">
            {data.property.features.length > 0 && (
              <div>
                <h3>Características</h3>
                <ul className="room-features">
                  {data.property.features.map((item: string, index: number) => (
                    <li style={{ color: "white" }} key={index}>
                      <svg className="check-icon" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.property.infrastructures.length > 0 && (
              <div>
                <h3>Infraestrutura</h3>
                <ul className="room-features">
                  {data.property.infrastructures.map(
                    (item: string, index: number) => (
                      <li style={{ color: "white" }} key={index}>
                        <svg className="check-icon" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>

          <br />

          <div className="final-summary">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <small
                  style={{ color: "var(--accent)", textTransform: "uppercase" }}
                >
                  Área Total
                </small>
                <div style={{ fontSize: "24px" }}>{data.property.area} m²</div>
              </div>
              <div>
                <small
                  style={{ color: "var(--accent)", textTransform: "uppercase" }}
                >
                  Condomínio
                </small>
                <div style={{ fontSize: "24px" }}>
                  R$ {data.property.condominium}
                </div>
              </div>
              <div>
                <small
                  style={{ color: "var(--accent)", textTransform: "uppercase" }}
                >
                  Vagas
                </small>
                <div style={{ fontSize: "24px" }}>{data.property.parking}</div>
              </div>
              <div>
                <small
                  style={{ color: "var(--accent)", textTransform: "uppercase" }}
                >
                  IPTU
                </small>
                <div style={{ fontSize: "24px" }}>
                  {data.property.iptu} /ano
                </div>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <small
                style={{ color: "var(--accent)", textTransform: "uppercase" }}
              >
                Investimento
              </small>
              <span className="price-tag">R$ {data.property.price}</span>
            </div>
          </div>
        </div>

        <div>
          <p style={{ marginBottom: "20px", fontSize: "20px" }}>
            Interessado? Agende uma visita.
          </p>
          <div className="agent-card">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
              className="agent-img"
              alt="Corretor"
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: "5px" }}>{data.agent.name}</h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {data.agent.specialization}
              </p>
              <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                {data.agent.phone}
              </p>
              <p style={{ fontSize: "14px" }}>{data.agent.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

```

E o css: 

```
/* =========================
   TEMA / TOKENS (fácil de ajustar)
   ========================= */
:root {
  --primary: #1a2c38; /* Azul Petróleo Escuro */
  --accent: #c5a065; /* Dourado Nobre */

  --bg-body: #5e5e5e; /* Fundo do navegador (não imprime) */
  --bg-page: #ffffff; /* Fundo da folha */

  --text-dark: #2c2c2c;
  --text-light: #f8f8f8;
  --muted: #666;

  --surface: #f4f6f7;
  --border: #ddd;

  /* Espaçamentos */
  --page-pad-x: 40px;
  --page-pad-y: 30px;

  /* Galeria (1 cômodo por página) */
  --gallery-pad: 18px;
  --gallery-radius: 10px;
}

/* =========================
   RESET / BASE
   ========================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

body {
  background-color: var(--bg-body);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  gap: 20px;
}

/* =========================
   ESTRUTURA DA PÁGINA A4
   ========================= */
.page {
  width: 210mm;
  height: 297mm;
  background: var(--bg-page);
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  page-break-after: always;
}

/* =========================
   PÁGINA 1: CAPA
   ========================= */
.cover-page .cover-image {
  height: 75%;
  width: 100%;
  object-fit: cover;
  display: block;
}

.cover-page .cover-content {
  height: 25%;
  background-color: var(--primary);
  color: var(--text-light);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.cover-page .tag {
  position: absolute;
  top: -20px;
  left: 40px;
  background-color: var(--accent);
  color: var(--primary);
  padding: 10px 30px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cover-page h1 {
  font-size: 36px;
  line-height: 1.1;
  margin-bottom: 10px;
}

.cover-page p {
  font-size: 18px;
  opacity: 0.9;
  font-weight: 300;
}

/* =========================
   PÁGINAS INTERNAS (CÔMODOS)
   ========================= */
.room-page {
  padding: 0;
}

.room-header {
  padding: var(--page-pad-y) var(--page-pad-x);
  border-bottom: 4px solid var(--accent);
}

.room-title {
  color: var(--primary);
  font-size: 28px;
  text-transform: uppercase;
  font-weight: 800;
}

.room-subtitle {
  color: var(--muted);
  font-size: 14px;
  margin-top: 5px;
}

/* Imagem principal do cômodo (usada na página com descrição + mini-galeria lateral) */
.room-hero {
  width: 100%;
  height: 45%;
  object-fit: cover;
  display: block;
}

.room-body {
  padding: var(--page-pad-y) var(--page-pad-x);
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
  flex: 1;
  min-height: 0;
}

.room-desc h3 {
  color: var(--accent);
  margin-bottom: 15px;
  font-size: 18px;
}

.room-desc p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-dark);
  text-align: justify;
  margin-bottom: 20px;
}

.room-features {
  list-style: none;
}

.room-features li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: #555;
  font-weight: 500;
}

.check-icon {
  width: 14px;
  height: 14px;
  fill: var(--accent);
  margin-right: 10px;
}

.side-gallery {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.side-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--border);
  display: block;
}

/* Rodapé interno */
.page-footer {
  margin-top: auto;
  padding: 15px var(--page-pad-x);
  background-color: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #888;
  text-transform: uppercase;
}

/* =========================
   ✅ PÁGINA DE GALERIA (1 cômodo = 1 página)
   ========================= */
.gallery-page .gallery-content {
  flex: 1;
  display: flex;
  padding: var(--gallery-pad);
  min-height: 0;
  position: relative;
}

.gallery-page .gallery-figure {
  flex: 1;
  border-radius: var(--gallery-radius);
  overflow: hidden;
  border: 1px solid var(--border);
  background: #fff;
  display: flex;
}

.gallery-page .gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Legenda opcional no canto inferior */
.gallery-page .gallery-caption {
  position: absolute;
  left: calc(var(--gallery-pad) + 14px);
  bottom: calc(var(--gallery-pad) + 14px);
  padding: 10px 14px;
  background: rgba(26, 44, 56, 0.75);
  color: var(--text-light);
  border-radius: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* =========================
   PÁGINA FINAL (RESUMO/CONTATO)
   ========================= */
.final-page {
  background-color: var(--primary);
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.final-summary {
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.price-tag {
  font-size: 42px;
  color: var(--accent);
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

.agent-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  color: var(--primary);
  padding: 20px;
  border-radius: 8px;
}

.agent-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.cta-button {
  background-color: var(--accent);
  color: var(--primary);
  text-align: center;
  padding: 15px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 20px;
  border-radius: 4px;
  text-decoration: none;
  display: block;
}

/* Utils */
.flex {
  display: flex;
  justify-content: space-around;
}

/* =========================
   IMPRESSÃO
   ========================= */
@media print {
  body {
    background: none;
    padding: 0;
    gap: 0;
  }
  .page {
    box-shadow: none;
    margin: 0;
    page-break-after: always;
  }
  .page:last-child {
    page-break-after: auto;
  }

  /* Opcional: imagem mais próxima das bordas no PDF */
  .gallery-page .gallery-content {
    padding: 10mm;
  }
}

```

Use o codigo como inspiração 