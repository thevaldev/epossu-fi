/*
 * This file was auto-generated
 */
const CodeExample = () => {
  return (
    <>
      <span style={{ color: "#52b7e5" }}>async</span>{" "}
      <span style={{ color: "#52b7e5" }}>function</span>{" "}
      <span style={{ color: "#95d773" }}>fetchMarketData</span>
      <span className="bracket">(</span>
      <span className="bracket">)</span>{" "}
      <span className="bracket">
        <span className="bracket">{"{"}</span>
      </span>
      {"\n"}
      {"\t"}
      <span className="comment">// API:n osoite</span>
      {"\n"}
      {"\t"}
      <span style={{ color: "#52b7e5" }}>const</span> ENDPOINT ={" "}
      <span className="string">'https://api.epossu.fi/v2/marketData'</span>
      <span className="semicolon">;</span>
      {"\n"}
      {"\n"}
      {"\t"}
      <span className="comment">// valinnaiset parametrit</span>
      {"\n"}
      {"\t"}
      <span style={{ color: "#52b7e5" }}>const</span> params ={" "}
      <span className="string">
        '?include_chart=<span style={{ color: "#52b7e5" }}>true</span>
        &price_timestamps=<span style={{ color: "#52b7e5" }}>false</span>'
      </span>
      <span className="semicolon">;</span>
      {"\n"}
      {"\n"}
      {"\t"}
      <span style={{ color: "#52b7e5" }}>const</span> response ={" "}
      <span style={{ color: "#f92672" }}>await</span>{" "}
      <span style={{ color: "#95d773" }}>fetch</span>
      <span className="bracket">(</span>ENDPOINT{" "}
      <span className="operator">+</span> params
      <span className="bracket">)</span>
      <span className="semicolon">;</span>{" "}
      <span className="comment">// Haetaan data API:sta</span>
      {"\n"}
      {"\t"}
      <span style={{ color: "#52b7e5" }}>const</span> json ={" "}
      <span style={{ color: "#f92672" }}>await</span> response
      <span className="json">.json</span>
      <span className="bracket">(</span>
      <span className="bracket">)</span>
      <span className="semicolon">;</span>{" "}
      <span className="comment">
        // Muutetaan data JSON<span className="operator">-</span>muotoon
      </span>
      {"\n"}
      {"\n"}
      {"\t"}
      <span style={{ color: "#f92672" }}>if</span>{" "}
      <span className="bracket">(</span>json.success =={" "}
      <span style={{ color: "#52b7e5" }}>true</span>
      <span className="bracket">)</span>{" "}
      <span style={{ color: "#f92672" }}>return</span> json.data
      <span className="semicolon">;</span>{" "}
      <span className="comment">// Jos haku onnistui, palautetaan data</span>
      {"\n"}
      {"\t"}
      <span style={{ color: "#f92672" }}>throw</span>{" "}
      <span style={{ color: "#f92672" }}>new</span>{" "}
      <span style={{ color: "#f92672" }}>Error</span>
      <span className="bracket">(</span>
      <span className="string">'Tietojen haussa tapahtui virhe'</span>
      <span className="bracket">)</span>
      <span className="semicolon">;</span>{" "}
      <span className="comment">// Muuten ilmoitetaan virheestä</span>
      {"\n"}
      <span className="bracket">
        <span className="bracket">{"}"}</span>
      </span>
      {"\n"}
      {"\n"}
      <span style={{ color: "#95d773" }}>fetchMarketData</span>
      <span className="bracket">(</span>
      <span className="bracket">)</span>.
      <span style={{ color: "#f92672" }}>then</span>
      <span className="bracket">(</span>
      <span className="bracket">(</span>data<span className="bracket">)</span>{" "}
      <span className="operator">{"=>"}</span>{" "}
      <span className="bracket">
        <span className="bracket">{"{"}</span>
      </span>
      {"\n"}
      {"\t"}
      <span style={{ color: "#52b7e5" }}>console</span>.
      <span style={{ color: "#95d773" }}>log</span>
      <span className="bracket">(</span>data<span className="bracket">)</span>
      <span className="semicolon">;</span>
      {"\n"}
      <span className="bracket">
        <span className="bracket">{"}"}</span>
      </span>
      <span className="bracket">)</span>
      <span className="semicolon">;</span>
      {"\n"}
    </>
  );
};
export default CodeExample;
