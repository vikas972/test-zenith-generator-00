
export const exportToExcel = (scenarios: any[]) => {
  // Convert scenarios to CSV format
  const headers = ['ID', 'Title', 'Description', 'Requirement ID', 'Priority', 'Flow Type', 'Flow Description', 'Condition Name', 'Coverage', 'Expected Results', 'Entries'];
  
  const rows = scenarios.flatMap(scenario => 
    scenario.flows.flatMap(flow => 
      flow.subflows.map(subflow => [
        scenario.id,
        scenario.title,
        scenario.description,
        scenario.requirementId,
        scenario.priority,
        flow.type,
        flow.description,
        subflow.name,
        subflow.coverage,
        subflow.expectedResults,
        subflow.entries?.map(e => e.description).join('; ') || ''
      ])
    )
  );

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'test_scenarios.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
