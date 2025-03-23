namespace QuoteApi.Models;

public class QuoteRequest
{
    public int Id { get; set; }
    public string ProjectType { get; set; } = string.Empty;
    public string Scope { get; set; } = string.Empty;
    public bool IsRush { get; set; }
    public decimal EstimatedCost { get; set; }
    public string EstimatedTime { get; set; } = string.Empty;    
}